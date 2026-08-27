import { z } from 'zod';
import { type TFunction } from 'i18next';

export const getAuthSchemas = (t: TFunction) => {
  const loginSchema = z.object({
    email: z.string().email(t('validation.email')),
    password: z.string().min(6, { message: t('validation.password') }),
  });

  const registerSchema = z.object({
    name: z.string().min(3, { message: t('validation.name') }),
    email: z.string().email(t('validation.email')),
    password: z.string().min(6, { message: t('validation.password') }),
    confirm_password: z.string().min(6, { message: t('validation.confirm_password') }),
  }).refine((data) => data.password === data.confirm_password, {
    message: t('validation.confirm_password'),
    path: ["confirm_password"],
  });

  const updateProfileSchema = z.object({
    name: z.string().min(3, { message: t('validation.name') }).optional().or(z.literal('')),
    email: z.string().email(t('validation.email')).optional().or(z.literal('')),
    password: z.string().min(6, { message: t('validation.password') }).optional().or(z.literal('')),
    confirm_password: z.string().optional().or(z.literal('')),
  }).refine((data) => {
    if (data.password && data.password !== '') {
      return data.password === data.confirm_password;
    }
    return true;
  }, {
    message: t('validation.confirm_password'),
    path: ["confirm_password"],
  });

  return { loginSchema, registerSchema, updateProfileSchema };
};

export type LoginFormData = z.infer<ReturnType<typeof getAuthSchemas>['loginSchema']>;
export type RegisterFormData = z.infer<ReturnType<typeof getAuthSchemas>['registerSchema']>;
export type UpdateProfileFormData = z.infer<ReturnType<typeof getAuthSchemas>['updateProfileSchema']>;