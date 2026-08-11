import { axiosClient } from '@/shared/api';
import type {
  CurrenciesListResponse,
  CurrencyDetailResponse,
  Currency,
  ExchangeRatesListResponse,
} from '../types/currency.types';

export interface FetchCurrenciesParams {
  page?: number;
  perPage?: number;
  search?: string;
  active?: boolean;
  inactive?: boolean;
  order?: string;
  sortedBy?: string;
}


// Currency CRUD

export async function fetchCurrencies(params: FetchCurrenciesParams = {}) {
  const paramsQuery = new URLSearchParams();
  paramsQuery.append('limit', (params.perPage || 15).toString());
  if (params.page) paramsQuery.append('page', params.page.toString());
  if (params.search) paramsQuery.append('search', params.search);
  if (params.active !== undefined) paramsQuery.append('active', params.active ? '1' : '0');
  if (params.inactive !== undefined) paramsQuery.append('inactive', params.inactive ? '1' : '0');
  if (params.order) paramsQuery.append('order', params.order);
  if (params.sortedBy) paramsQuery.append('sortedBy', params.sortedBy);

  const response = await axiosClient.get<CurrenciesListResponse>('/currencies?' + paramsQuery.toString());
  return response.data;
}


export async function fetchCurrencyById(id: number) {
  const response = await axiosClient.get<CurrencyDetailResponse>('/currencies/' + id);
  return response.data;
}


export async function createCurrency(payload: Omit<Currency, 'id'>) {
  const response = await axiosClient.post<CurrenciesListResponse>('/currencies', payload);
  return response.data;
}


export async function updateCurrency(id: number, payload: Omit<Currency, 'id'>) {
  const response = await axiosClient.put<CurrenciesListResponse>(`/currencies/${id}`, payload);
  return response.data;
}


export async function deleteCurrency(id: number) {
  const response = await axiosClient.delete<CurrenciesListResponse>(`/currencies/${id}`);
  return response.data;
}


// Base Currency

export async function setBaseCurrency(id: number) {
  const response = await axiosClient.post<CurrenciesListResponse>(`/currencies/${id}/set-base`);
  return response.data;
}


// Exchange Rates

export async function fetchExchangeRates(currencyId: number, effectiveDate?: string) {
  const paramsQuery = new URLSearchParams();
  paramsQuery.append('currency_id', currencyId.toString());
  if (effectiveDate) paramsQuery.append('effective_date', effectiveDate);
  const response = await axiosClient.get<ExchangeRatesListResponse>('/currency-rates?' + paramsQuery.toString());
  return response.data;
}


export async function createExchangeRate(payload: { effective_date: string; exchange_rate: number; currency_id: number }) {
  const response = await axiosClient.post<ExchangeRatesListResponse>('/currency-rates', payload);
  return response.data;
}


export async function updateExchangeRate(id: number, payload: { effective_date: string; exchange_rate: number }) {
  const response = await axiosClient.put<ExchangeRatesListResponse>(`/currency-rates/${id}`, payload);
  return response.data;
}


export async function deleteExchangeRate(id: number) {
  const response = await axiosClient.delete<ExchangeRatesListResponse>(`/currency-rates/${id}`);
  return response.data;
}