import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { ImagePreview } from '@/shared/components/image-preview';
import {
  brandFormSchema,
  brandFormDefaults,
  toApiFormat,
  type BrandFormValues,
} from '../schemas/brand.schema';
import { useCreateBrand, useUpdateBrand, useBrand } from '../hooks/use-brands';
import { useLanguage } from '@/shared/hooks/use-language';
import type { Brand } from '../types/brand.types';
import type { ApiErrorResponse } from '@/shared/api';

interface BrandFormDialogProps {
  brand?: Brand | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function BrandFormDialog({
  brand,
  open,
  onOpenChange,
  onSuccess,
}: BrandFormDialogProps) {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();
  const isEditing = !!brand;
  const createMutation = useCreateBrand();
  const updateMutation = useUpdateBrand();
  const { data: brandDetail, isLoading: isDetailLoading } = useBrand(brand?.id ?? 0);
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
  const [desktopPreview, setDesktopPreview] = useState<string | null>(null);
  const [mobilePreview, setMobilePreview] = useState<string | null>(null);

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: brandFormDefaults,
  });

  const prevOpenRef = useRef(false);
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setServerErrors({});
      setDesktopPreview(null);
      setMobilePreview(null);
      if (isEditing && brand) {
        form.reset(brandFormDefaults);
      } else {
        form.reset(brandFormDefaults);
      }
    }
    prevOpenRef.current = open;
  }, [open, form, isEditing, brand]);

  const prevBrandIdRef = useRef<number | null>(null);
  useEffect(() => {
    if (isEditing && brand && brandDetail?.data) {
      const d = brandDetail.data;
      const currentLang = i18n.language || 'en';
      form.setValue(currentLang === 'en' ? 'nameEn' : 'nameAr', d.name);
      form.setValue(currentLang === 'en' ? 'detailsEn' : 'detailsAr', d.details || '');
      form.setValue('status', d.status ? '1' : '0');
      setDesktopPreview(d.image?.desktop || null);
      setMobilePreview(d.image?.mobile || null);
      prevBrandIdRef.current = brand.id;
    }
  }, [brandDetail, isEditing, brand, form, i18n.language]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'imageDesktop' | 'imageMobile',
    setPreview: (preview: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    form.setValue(field, file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const onSubmit = (values: BrandFormValues) => {
    setServerErrors({});
    const apiData = toApiFormat(values);

    const commonOptions = {
      onError: (error: unknown) => {
        const apiError = error as ApiErrorResponse;
        if (apiError?.status === 422 && apiError.errors) {
          setServerErrors(apiError.errors);
        }
      },
    };

    if (isEditing && brand) {
      updateMutation.mutate(
        { id: brand.id, data: { ...apiData, _method: 'PUT' } },
        { ...commonOptions, onSuccess }
      );
    } else {
      createMutation.mutate(apiData, { ...commonOptions, onSuccess });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending || isDetailLoading;
  const errors = form.formState.errors;

  const getError = (field: string): string | undefined => {
    const clientErr = errors[field as keyof BrandFormValues]?.message as string | undefined;
    const serverErr = serverErrors[field]?.[0];
    const errMsg = clientErr || serverErr;
    if (!errMsg) return undefined;
    return t(errMsg, errMsg);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? t('brands.editBrand') : t('brands.createBrand')}</DialogTitle>
          <DialogDescription>
            {t('brands.subtitle')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="nameEn" className="text-sm font-medium">{t('brandsForm.nameEn')} *</label>
              <Input
                id="nameEn"
                placeholder={t('brandsForm.nameEn')}
                {...form.register('nameEn')}
              />
              {getError('nameEn') && (
                <p className="text-xs text-destructive">{getError('nameEn')}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="nameAr" className="text-sm font-medium">{t('brandsForm.nameAr')} *</label>
              <Input
                id="nameAr"
                placeholder={t('brandsForm.nameAr')}
                dir="rtl"
                {...form.register('nameAr')}
              />
              {getError('nameAr') && (
                <p className="text-xs text-destructive">{getError('nameAr')}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="detailsEn" className="text-sm font-medium">{t('brandsForm.detailsEn')}</label>
            <Textarea id="detailsEn" placeholder={t('brandsForm.detailsEn')} rows={2} {...form.register('detailsEn')} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="detailsAr" className="text-sm font-medium">{t('brandsForm.detailsAr')}</label>
            <Textarea id="detailsAr" placeholder={t('brandsForm.detailsAr')} dir="rtl" rows={2} {...form.register('detailsAr')} />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">{t('brandsForm.status')} *</label>
            <Select
              value={form.watch('status')}
              onValueChange={(value) => form.setValue('status', value)}
            >
              <SelectTrigger>                <SelectValue placeholder={t('brandsForm.status')}>                  {form.watch('status') === '1' ? t('brandsForm.active') : t('brandsForm.inactive')}                </SelectValue>              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t('brandsForm.active')}</SelectItem>
                <SelectItem value="0">{t('brandsForm.inactive')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="imageDesktop" className="text-sm font-medium">{t('brandsForm.desktopImage')}</label>
              <Input id="imageDesktop" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'imageDesktop', setDesktopPreview)} />
              {desktopPreview && <ImagePreview src={desktopPreview} alt="Desktop preview" thumbnailClassName="h-16 rounded border object-cover mt-1" />}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="imageMobile" className="text-sm font-medium">{t('brandsForm.mobileImage')}</label>
              <Input id="imageMobile" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'imageMobile', setMobilePreview)} />
              {mobilePreview && <ImagePreview src={mobilePreview} alt="Mobile preview" thumbnailClassName="h-16 rounded border object-cover mt-1" />}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>{t('common.cancel')}</Button>
            <Button type="submit" disabled={isPending || isDetailLoading}>
              {isDetailLoading
                ? t('common.loading')
                : isPending
                  ? (isEditing ? t('brands.updating') : t('brands.creating'))
                  : (isEditing ? t('brandsForm.updateBrand') : t('brandsForm.createBrand'))}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


