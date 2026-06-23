# Ecommerce CMS

A full-featured admin dashboard for managing an e-commerce platform. Built with React 19, TypeScript 6, and Vite 8.

## Features

- **Authentication** — Login/logout with JWT, protected routes, guest redirects
- **Dashboard** — Overview analytics and quick actions
- **Category Management** — CRUD with tree structure, ordering, featured categories
- **Brand Management** — CRUD with image uploads and drag-and-drop reordering
- **Slider Management** — Banner slides with desktop/mobile images and product linking
- **FAQ Management** — Frequently asked questions with sorting
- **Flash Sales** — Time-limited promotions with product selection
- **Coupon Management** — Discount codes with configurable limits and date ranges
- **Promotion Management** — Price discounts, quantity promotions, and gift-with-purchase
- **Attribute Management** — Product attributes and variations
- **Role & Permission Management** — RBAC with granular permission assignment
- **User Management** — Admin user CRUD with role assignment
- **Contact Messages** — Inbox for customer inquiries
- **Settings** — Application configuration
- **Internationalization** — Full English/Arabic (RTL) support
- **Responsive Design** — Mobile-friendly with collapsible sidebar
- **Dark Mode** — Theme toggle with system preference detection

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Routing | react-router v7 (BrowserRouter) |
| Data Fetching | @tanstack/react-query 5 |
| State Management | Zustand 5 |
| Forms | react-hook-form + Zod 4 |
| HTTP Client | Axios |
| Internationalization | i18next + react-i18next |
| Notifications | Sonner |
| Icons | Lucide React |
| Drag & Drop | @dnd-kit |
| Package Manager | pnpm |

## Prerequisites

- Node.js 20 or higher
- pnpm (recommended) or npm

## Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd ecommerce-cms

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
```

Edit `.env` and set your API base URL:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
```

Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start development server with HMR |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint across the codebase |

## Project Structure

```
src/
├── app/                # App entry point, root component, router
├── features/           # Feature modules (auth, brands, categories, etc.)
│   ├── auth/
│   ├── brands/
│   ├── categories/
│   ├── coupons/
│   ├── faqs/
│   ├── flash-sale/
│   ├── promotions/
│   ├── roles/
│   ├── settings/
│   ├── sliders/
│   └── users/
├── layouts/            # Admin layout, sidebar, header
├── shared/             # Shared UI components, i18n, hooks, styles
│   ├── components/
│   ├── hooks/
│   ├── i18n/
│   └── styles/
└── widgets/            # Reusable feature widgets
```

## Deployment

### Netlify (Recommended)

1. Push the repository to GitHub
2. Log in to [Netlify](https://app.netlify.com)
3. Click **Add new site** → **Import an existing project**
4. Connect your Git provider and select the repository
5. Netlify will auto-detect the build settings from `netlify.toml`:

   | Setting | Value |
   |---|---|
   | Build command | `npm run build` |
   | Publish directory | `dist` |

6. Add the required environment variable:

   | Key | Value |
   |---|---|
   | `VITE_API_BASE_URL` | Your API base URL (e.g. `https://api.example.com/api/v1`) |

7. Click **Deploy**

The `netlify.toml` configuration includes an SPA redirect rule so all routes (`/dashboard`, `/login`, etc.) serve `index.html` instead of returning 404 errors.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_API_BASE_URL` | Yes | Base URL of the backend API |

## License

MIT
