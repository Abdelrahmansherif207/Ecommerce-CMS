# HomePage CMS — Sections Management

Build a production-grade CMS page for managing homepage sections. The admin can list, create, edit, delete, reorder (drag & drop), and toggle-active homepage sections — each with type-specific settings.

## API Discovery Summary

All endpoints tested via curl against the live API. Key findings:

### Section Types (from `GET /section-types`)
`banners | sliders | promotions | categories | products | flash-sales | brands | coupons`

### Product Types (from `GET /product-type`) — only relevant when section type = `products`
`best_product_sales | brands_product | new_arrivals | all_product_discounts | product_discount_today_or_low_qty | flash_sales_product | flash_sales_end_today | product_for_parent_category | flash_sales_end_week`

### Type Settings Templates (from `GET /section-types/{type}/settings`)

| Type | Front Settings | Back Settings |
|------|---------------|---------------|
| **banners** | autoplay, slider_speed | slug |
| **sliders** | autoplay, slider_speed | start_date, end_date, limit, slidersId[], order |
| **promotions** | autoplay, slider_speed | slug, with_product, order |
| **categories** | autoplay, slider_speed | parent, limit, categoriesId[], order |
| **products** | autoplay, slider_speed | limit, order, order_price, type, productsId, categoriesId, brandsId, promotionsId, flashSalesId, bannersId, couponsId |
| **flash-sales** | autoplay, slider_speed | start_date, end_date, limit, flashSalesId[], order |
| **coupons** | autoplay, slider_speed | start_date, end_date, limit, couponsId[], order |
| **brands** | autoplay, slider_speed | start_date, end_date, limit, brandsId[], order |

### Products Type Special Logic
When section type is `products` and `setting.back.type` is set to a product-type template (e.g. `flash_sales_product`):
- **Only show**: `type`, `order`, `limit` (+ optional `productsId`)
- **Hide all other back settings** (categoriesId, brandsId, promotionsId, etc.)

When no product-type template is selected, show ALL back setting fields normally.

### Existing Live Sections (17 total)
The API returned 17 sections covering all types, confirming the data shapes above. Example:
- id:1 banners → back: `{slug}` 
- id:5 products (no template) → back: `{limit, order, order_price, type:null, ...all IDs null}`
- id:7 products (with template) → back: `{limit:10, type:"flash_sales_product", productsId:[]}`

---

## Established Codebase Conventions

Based on the existing `sliders` feature (most similar to what we're building):

| Layer | Pattern | Example |
|-------|---------|---------|
| **Types** | TypeScript interfaces in `types/` | `slider.types.ts` |
| **API** | Async functions using `axiosClient` in `api/` | `sliders.api.ts` |
| **Hooks** | TanStack React Query wrappers in `hooks/` | `use-sliders.ts` |
| **Schemas** | Zod + `toApiFormat()` in `schemas/` | `slider.schema.ts` |
| **Pages** | Page component with state, filters, table, dialogs | `sliders-page.tsx` |
| **Components** | Table with `@dnd-kit` drag-reorder, form dialog, delete dialog, status badge | `sliders-table.tsx`, `slider-form-dialog.tsx` |
| **Routing** | Lazy-loaded in `App.tsx`, nav entry in `nav-data.ts` | Already has `/cms` nav item |
| **i18n** | Keys under feature namespace in `translation.json` | `sliders.*`, `slidersForm.*` |

---

## Proposed Changes

### 1. Types Layer

#### [NEW] [section.types.ts](file:///g:/Projects/kareem/Ecommerce-CMS/src/features/cms/types/section.types.ts)

```typescript
// Core section model matching API response
interface Section {
  id: number;
  type: string;        // "banners" | "products" | etc.
  title: string;
  endpoint: string;
  order: number;
  is_active: boolean;
  setting?: {
    front: Record<string, unknown>;
    back: Record<string, unknown>;
  };
}

// API response wrappers
interface SectionsListResponse { status; message; success; data: Section[] }
interface SectionDetailResponse { status; message; success; data: Section }
interface SectionTypesResponse { status; message; success; data: string[] }
interface TypeSettingsResponse { status; message; success; data: { front; back } }

// Create/Update payloads
interface CreateSectionPayload { type; title: {en; ar}; endpoint; order; setting? }
interface UpdateSectionPayload { title?; order?; is_active?; title_visible?; setting? }
```

---

### 2. API Layer

#### [NEW] [sections.api.ts](file:///g:/Projects/kareem/Ecommerce-CMS/src/features/cms/api/sections.api.ts)

Functions following the `sliders.api.ts` pattern:
- `fetchSections()` → `GET /sections`
- `fetchSectionById(id)` → `GET /sections/{id}`
- `createSection(payload)` → `POST /sections`
- `updateSection(id, payload)` → `PUT /sections/{id}`
- `deleteSection(id)` → `DELETE /sections/{id}`
- `toggleSectionActive(id)` → `PATCH /sections/{id}/toggle-active`
- `reorderSections(ids[])` → `POST /sections/reorder`
- `fetchSectionTypes()` → `GET /section-types`
- `fetchTypeSettings(typeName)` → `GET /section-types/{typeName}/settings`
- `fetchProductTypes()` → `GET /product-type`

---

### 3. React Query Hooks

#### [NEW] [use-sections.ts](file:///g:/Projects/kareem/Ecommerce-CMS/src/features/cms/hooks/use-sections.ts)

Query & mutation hooks following the `use-sliders.ts` pattern:
- `useSections()` — query for the section list
- `useSection(id)` — query for a single section
- `useSectionTypes()` — query for available types
- `useTypeSettings(typeName)` — query for type-specific settings template (enabled only when typeName is set)
- `useProductTypes()` — query for product sub-types (enabled only when section type = "products")
- `useCreateSection()` — mutation
- `useUpdateSection()` — mutation
- `useDeleteSection()` — mutation
- `useToggleSectionActive()` — mutation
- `useReorderSections()` — mutation

All mutations invalidate `['sections']` query key and show `toast.success/error`.

---

### 4. Validation Schemas

#### [NEW] [section.schema.ts](file:///g:/Projects/kareem/Ecommerce-CMS/src/features/cms/schemas/section.schema.ts)

```typescript
// Zod schema for the create/edit form
const sectionFormSchema = z.object({
  type: z.string().min(1),
  titleEn: z.string().min(1).max(50),
  titleAr: z.string().min(1).max(50),
  isActive: z.boolean().default(true),
  titleVisible: z.boolean().default(true),
  // Settings — dynamic, validated per-type
  frontSettings: z.record(z.unknown()).optional(),
  backSettings: z.record(z.unknown()).optional(),
  // Products-specific
  productType: z.string().nullable().optional(),
});

// toApiFormat() transforms form values → API payload
```

---

### 5. UI Components

#### [NEW] [sections-table.tsx](file:///g:/Projects/kareem/Ecommerce-CMS/src/features/cms/components/sections-table.tsx)

Sortable table with drag-and-drop reorder (same `@dnd-kit` pattern as `sliders-table.tsx`):

| Column | Content |
|--------|---------|
| ⠿ (grip) | Drag handle |
| # | Order number |
| Type | Section type badge with color coding |
| Title | Section title |
| Endpoint | Generated endpoint (truncated) |
| Status | Active/Inactive toggle badge |
| Actions | Toggle active, Edit, Delete (dropdown menu) |

Features:
- Drag-to-reorder with optimistic UI → calls `POST /sections/reorder`
- Inline toggle-active button → calls `PATCH /sections/{id}/toggle-active`
- Loading skeleton state
- Empty state

#### [NEW] [section-form-dialog.tsx](file:///g:/Projects/kareem/Ecommerce-CMS/src/features/cms/components/section-form-dialog.tsx)

Modal dialog for create/edit with dynamic settings form. This is the most complex component:

**Step 1 — Base Fields** (always shown):
- Type selector (dropdown from `GET /section-types`, **disabled when editing**)
- Title EN + Title AR inputs
- Is Active toggle
- Title Visible toggle

**Step 2 — Dynamic Settings** (shown after type is selected):

When a type is selected, `GET /section-types/{type}/settings` is fetched. The response defines the settings template. The form dynamically renders:

**Front Settings** (display config):
- `autoplay` → Switch/Checkbox
- `slider_speed` → Number input
- `columns_count` → Number input
- `show_timer` → Switch/Checkbox
- `badge_text` → Text input
- `timer_end_at` → Datetime input
- `layout` → Select (list/grid)

**Back Settings** (data config) — rendered based on the type template:
- `slug` → Text input
- `limit` → Number input
- `order` → Select (asc/desc)
- `order_price` → Select (asc/desc)
- `start_date` / `end_date` → Date inputs
- `with_product` → Switch/Checkbox
- `parent` / `parent_only` / `pest_category` → Switch/Checkbox
- `*Id` arrays (productsId, categoriesId, etc.) → Multi-number-input (comma-separated IDs)
- `type` (product template) → Select populated from `GET /product-type`

**Products Type Special Behavior:**
When type = `products`:
1. Show a "Product Template" dropdown populated from `GET /product-type`
2. If a template is selected → hide all back settings EXCEPT `type`, `order`, `limit` (+ `productsId`)
3. If no template selected → show all back settings normally

#### [NEW] [section-delete-dialog.tsx](file:///g:/Projects/kareem/Ecommerce-CMS/src/features/cms/components/section-delete-dialog.tsx)

Confirmation dialog following `slider-delete-dialog.tsx` pattern.

#### [NEW] [section-type-badge.tsx](file:///g:/Projects/kareem/Ecommerce-CMS/src/features/cms/components/section-type-badge.tsx)

Color-coded badge for section types (banners=blue, products=purple, categories=green, etc.)

#### [NEW] [dynamic-settings-form.tsx](file:///g:/Projects/kareem/Ecommerce-CMS/src/features/cms/components/dynamic-settings-form.tsx)

Reusable sub-component that renders front/back settings fields based on the type settings template. Handles:
- Auto-detecting field types from template values (boolean→switch, number→number input, string→text, array→multi-input, null→text)
- The products-type conditional logic
- Grouping fields into "Display Settings" (front) and "Data Settings" (back) sections

---

### 6. Page

#### [NEW] [sections-page.tsx](file:///g:/Projects/kareem/Ecommerce-CMS/src/features/cms/pages/sections-page.tsx)

Following the `sliders-page.tsx` pattern:
- Page header with title + "Add Section" button + Refresh button
- `SectionsTable` with drag-reorder
- `SectionFormDialog` for create/edit
- No pagination needed (sections are returned as a flat array, not paginated)

---

### 7. Routing & Navigation

#### [MODIFY] [App.tsx](file:///g:/Projects/kareem/Ecommerce-CMS/src/app/App.tsx)

Add lazy-loaded route:
```diff
+const SectionsPage = lazy(() => import("@/features/cms/pages/sections-page").then(m => ({ default: m.SectionsPage })));
 ...
+<Route path="/cms" element={<SectionsPage />} />
```

The sidebar already has the `/cms` nav item in `nav-data.ts`.

---

### 8. Feature Index

#### [MODIFY] [index.ts](file:///g:/Projects/kareem/Ecommerce-CMS/src/features/cms/index.ts)

Uncomment and export types, hooks, and page.

---

### 9. Internationalization

#### [MODIFY] [en/translation.json](file:///g:/Projects/kareem/Ecommerce-CMS/src/shared/i18n/locales/en/translation.json)

Add `sections` and `sectionsForm` namespaces with all labels.

#### [MODIFY] [ar/translation.json](file:///g:/Projects/kareem/Ecommerce-CMS/src/shared/i18n/locales/ar/translation.json)

Add Arabic translations for all CMS section labels.

---

## Open Questions

> [!IMPORTANT]
> **1. Settings ID fields (productsId, categoriesId, brandsId, etc.)** — These are arrays of entity IDs. Should we provide a search-and-select UI (like the slider's product search), or is a simple comma-separated ID input sufficient for now? A search-select would require additional API endpoints for each entity type.

> [!IMPORTANT]
> **2. Front settings per section** — From the live data, different product sections use different front settings (e.g., `columns_count`, `show_timer`, `timer_end_at`, `badge_text`). These are NOT returned by the type settings template — they seem to be free-form. Should we:
>   - **(A)** Render the template fields only and allow adding custom key-value pairs?
>   - **(B)** Render known fields with proper inputs and ignore unknowns?
>   - **(C)** Render all fields from the template + a JSON editor for overrides?
>
> **I recommend (B)** — render known fields with proper typed inputs. This covers all observed patterns from the live data.

> [!NOTE]
> The `brands` type settings endpoint returned 404 when using `brand` (singular), but 200 when using `brands` (plural). The API type list returns `brands`, so we'll use that consistently.

---

## File Structure Summary

```
src/features/cms/
├── api/
│   └── sections.api.ts          [NEW]
├── components/
│   ├── sections-table.tsx       [NEW]
│   ├── section-form-dialog.tsx  [NEW]
│   ├── section-delete-dialog.tsx[NEW]
│   ├── section-type-badge.tsx   [NEW]
│   └── dynamic-settings-form.tsx[NEW]
├── hooks/
│   └── use-sections.ts          [NEW]
├── pages/
│   └── sections-page.tsx        [NEW]
├── schemas/
│   └── section.schema.ts        [NEW]
├── types/
│   └── section.types.ts         [NEW]
└── index.ts                     [MODIFY]
```

---

## Verification Plan

### Automated Tests
- TypeScript compilation: `npx tsc --noEmit`
- Build check: `npm run build`

### Manual Verification
1. Navigate to `/cms` in the sidebar → sections list loads with all 17 sections
2. Drag-and-drop reorder → API call fires, toast confirms, new order persists on refresh
3. Toggle active → status badge updates, toast confirms
4. Create new section → select type, fill form, settings template loads, submit succeeds
5. Create products section with template → only type/order/limit shown in back settings
6. Create products section without template → all back settings shown
7. Edit existing section → form populates with current values, update succeeds
8. Delete section → confirmation dialog, delete succeeds, list updates
