export interface LocalizedString {
  ar: string;
  en: string;
}

export interface FastShippingSettings {
  enabled: boolean;
  duration_minutes: number;
  fee: number;
  start_hour: string;
  end_hour: string;
}

export interface Settings {
  site_name: LocalizedString;
  site_desc: LocalizedString;
  meta_desc: LocalizedString;
  site_copy_right: LocalizedString;
  logo: string;
  footer_logo: string;
  favicon: string;
  site_email: string;
  email_support: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  promotion_video_url: string;
  youtube: string;
  phone: string;
  minimumOrderAmount: number;
  options: { fast_shipping: FastShippingSettings } | null;
}

export interface SettingsResponse {
  status: number;
  message: string;
  success: boolean;
  data: Settings;
}

export interface UpdateSettingsPayload {
  'site_name[en]': string;
  'site_name[ar]': string;
  'site_desc[en]': string;
  'site_desc[ar]': string;
  'meta_desc[en]': string;
  'meta_desc[ar]': string;
  'site_copy_right[en]': string;
  'site_copy_right[ar]': string;
  minimum_order_amount?: string | number;
  site_email: string;
  email_support: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  promotion_video_url: string;
  youtube: string;
  phone: string;
  logo?: File;
  footer_logo?: File;
  favicon?: File;
}

export interface FastShippingSettingsResponse {
  status: number;
  message: string;
  success: boolean;
  data: FastShippingSettings;
}

export interface UpdateFastShippingSettingsPayload {
  enabled: boolean;
  duration_minutes: number;
  fee: number;
  start_hour: string;
  end_hour: string;
}
