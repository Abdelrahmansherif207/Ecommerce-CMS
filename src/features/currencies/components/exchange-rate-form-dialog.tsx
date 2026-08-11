import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { CalendarDays } from 'lucide-react';
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
import { cn } from '@/shared/lib/utils';
import {
  exchangeRateFormSchema,
  exchangeRateFormDefaults,
  type ExchangeRateFormValues,
} from '../schemas/exchange-rate.schema';
import { useCreateExchangeRate, useUpdateExchangeRate, useExchangeRates } from '../hooks/use-currencies';
import type { ExchangeRate } from '../types/currency.types';

interface ExchangeRateFormDialogProps {
  rate?: ExchangeRate | null;
  currencyId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ExchangeRateFormDialog({
  rate,
  currencyId,
  open,
  onOpenChange,
  onSuccess,
}: ExchangeRateFormDialogProps) {
  const { t } = useTranslation();
  const isEditing = !!rate;
  const { data: ratesData, isLoading: isLoadingRates } = useExchangeRates(currencyId);
  const [form, setForm] = useState<any>(null);
  const prevOpenRef = useRef(false);

  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setFormDefaults();
      resetForm();
      if (isEditing && rate) {
        populateFormForEdit(rate, form);
      }
    }
    prevOpenRef.current = open;
  }, [open, isEditing, rate]);

  const setFormDefaults = () => {
    const newForm = useForm<ExchangeRateFormValues>({
      resolver: zodResolver(exchangeRateFormSchema),
      defaultValues: exchangeRateFormDefaults,
    });
    setForm(newForm);
  };

  const populateFormForEdit = (rate: ExchangeRate, form: any) => {
    form.setValue('effective_date', rate.effective_date.split('T')[0]); // Format for date input
    form.setValue('exchange_rate', rate.exchange_rate);
  };

  const resetForm = () => {
    // Reset form to defaults
  };

  const createMutation = useCreateExchangeRate({
    onSuccess: (response) => {
      toast.success(response.message || t('common.created'));
      onSuccess();
    },
    onError: (error) => {
      // Errors handled by mutation onError
    }
  });

  const updateMutation = useUpdateExchangeRate({
    onSuccess: (response) => {
      toast.success(response.message || t('common.updated'));
      onSuccess();
    },
    onError: (error) => {
      // Errors handled by mutation onError
    }
  });

  const onSubmit = async (data: ExchangeRateFormValues) => {
    try {
      if (isEditing && rate) {
        await updateMutation.mutateAsync({
          id: rate.id,
          data: {
            effective_date: data.effective_date,
            exchange_rate: data.exchange_rate,
          },
        });
        toast.success(updateMutation.data?.message || t('common.updated'));
      } else {
        await createMutation.mutateAsync({
          currency_id: currencyId,
          effective_date: data.effective_date,
          exchange_rate: data.exchange_rate,
        });
        toast.success(createMutation.data?.message || t('common.created'));
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      // Errors handled by mutation onError
    }
  };

  return (
    <>
      {form && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="w-[400px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? t('exchangeRateForm.editTitle') : t('exchangeRateForm.createTitle')}</DialogTitle>
              <DialogDescription>{isEditing ? t('exchangeRateForm.editSubtitle') : t('exchangeRateForm.createSubtitle')}</DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="effectiveDate" className="text-sm font-medium">{t('exchangeRateForm.effectiveDate')}</label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={form.watch('effective_date') || ''}
                  onChange={(e) => form.setValue('effective_date', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="exchangeRate" className="text-sm font-medium">{t('exchangeRateForm.exchangeRate')}</label>
                <Input
                  id="exchangeRate"
                  type="number"
                  step="0.0001"
                  min="0"
                  value={form.watch('exchange_rate') || ''}
                  onChange={(e) => form.setValue('exchange_rate', parseFloat(e.target.value) || 0)}
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  {t('common.cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isPending || isLoadingRates}
                >
                  {isLoadingRates
                    ? t('common.loading')
                    : form.formState.isPending
                      ? (isEditing ? t('common.updating') : t('common.creating'))
                      : (isEditing ? t('common.update') : t('common.create'))}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
