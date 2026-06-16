import { z } from 'zod';

export const categoryFormSchema = z.object({
  nameEn: z.string().min(1, 'validation.nameEnRequired'),
  nameAr: z.string().min(1, 'validation.nameArRequired'),
  detailsEn: z.string().optional(),
  detailsAr: z.string().optional(),
  imageDesktop: z.instanceof(File).optional(),
  imageMobile: z.instanceof(File).optional(),
  parentId: z.number().nullable().optional(),
  shopIds: z.array(z.number()).optional(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const categoryFormDefaults: CategoryFormValues = {
  nameEn: '',
  nameAr: '',
  detailsEn: '',
  detailsAr: '',
  imageDesktop: undefined,
  imageMobile: undefined,
  parentId: null,
  shopIds: [],
};

export function toApiFormat(values: CategoryFormValues) {
  return {
    'name[en]': values.nameEn,
    'name[ar]': values.nameAr,
    'details[en]': values.detailsEn || undefined,
    'details[ar]': values.detailsAr || undefined,
    image_desktop: values.imageDesktop,
    image_mobile: values.imageMobile,
    parent_id: values.parentId,
    'shops_id[]': values.shopIds || [],
  };
}
