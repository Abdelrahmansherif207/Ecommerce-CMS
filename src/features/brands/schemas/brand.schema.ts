import { z } from 'zod';

export const brandFormSchema = z.object({
  nameEn: z.string().min(1, 'validation.nameEnRequired'),
  nameAr: z.string().min(1, 'validation.nameArRequired'),
  detailsEn: z.string().optional(),
  detailsAr: z.string().optional(),
  imageDesktop: z.instanceof(File).optional(),
  imageMobile: z.instanceof(File).optional(),
  status: z.string().default('1'),
});

export type BrandFormValues = z.infer<typeof brandFormSchema>;

export const brandFormDefaults: BrandFormValues = {
  nameEn: '',
  nameAr: '',
  detailsEn: '',
  detailsAr: '',
  imageDesktop: undefined,
  imageMobile: undefined,
  status: '1',
};

export function toApiFormat(values: BrandFormValues) {
  return {
    'name[en]': values.nameEn,
    'name[ar]': values.nameAr,
    'details[en]': values.detailsEn || undefined,
    'details[ar]': values.detailsAr || undefined,
    image_desktop: values.imageDesktop,
    image_mobile: values.imageMobile,
    status: values.status,
  };
}
