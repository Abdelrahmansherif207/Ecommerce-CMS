export interface LoginData {
  email?: string;
  phone_number?: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  success: boolean;
  data: AuthData;
}

export interface AuthData {
  token: string;
  permissions: string[];
  email_verified: boolean;
  role: string[];
}

export interface User {
  email?: string;
  phone_number?: string;
  role: string[];
  permissions: string[];
  email_verified: boolean;
}
