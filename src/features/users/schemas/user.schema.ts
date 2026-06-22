import { z } from 'zod';

export const userFormSchema = z
  .object({
    name: z.string().min(1, 'validation.nameRequired'),
    email: z.string().min(1, 'validation.emailRequired').email('validation.emailInvalid'),
    password: z.string().min(8, 'validation.passwordMin'),
    passwordConfirmation: z.string().min(1, 'validation.passwordConfirmationRequired'),
    roleIds: z.array(z.number()).min(1, 'validation.rolesRequired'),
    isActive: z.string().default('1'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'validation.passwordMismatch',
    path: ['passwordConfirmation'],
  });

export type UserFormValues = z.infer<typeof userFormSchema>;

export const userFormDefaults: UserFormValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  roleIds: [],
  isActive: '1',
};

export function toApiFormat(values: UserFormValues) {
  return {
    name: values.name,
    email: values.email,
    password: values.password,
    password_confirmation: values.passwordConfirmation,
    roles: values.roleIds,
    is_active: values.isActive === '1',
  };
}
