import { ZNameSchema } from '../../../lib/types/name.js';
import { zEmail } from '../../../lib/utils/zod.js';
import { z } from 'zod';

const ZCurrentPasswordSchema = z.string().min(6, {
  message: 'Must be at least 6 characters in length'
}).max(72);
const ZSignInSchema = z.object({
  email: zEmail().min(1),
  password: ZCurrentPasswordSchema,
  totpCode: z.string().trim().optional(),
  backupCode: z.string().trim().optional(),
  csrfToken: z.string().trim(),
  captchaToken: z.string().trim().optional()
});
const ZPasswordSchema = z.string().min(8, {
  message: 'Must be at least 8 characters in length'
}).max(72, {
  message: 'Cannot be more than 72 characters in length'
}).refine(value => value.length > 25 || /[A-Z]/.test(value), {
  message: 'One uppercase character'
}).refine(value => value.length > 25 || /[a-z]/.test(value), {
  message: 'One lowercase character'
}).refine(value => value.length > 25 || /\d/.test(value), {
  message: 'One number'
}).refine(value => value.length > 25 || /[`~<>?,./!@#$%^&*()\-_"'+=|{}[\];:\\]/.test(value), {
  message: 'One special character is required'
});
const ZSignUpSchema = z.object({
  name: ZNameSchema,
  email: zEmail(),
  password: ZPasswordSchema,
  signature: z.string().nullish(),
  captchaToken: z.string().trim().optional()
});
const ZForgotPasswordSchema = z.object({
  email: zEmail().min(1)
});
const ZResetPasswordSchema = z.object({
  password: ZPasswordSchema,
  token: z.string().min(1)
});
const ZVerifyEmailSchema = z.object({
  token: z.string().min(1)
});
const ZResendVerifyEmailSchema = z.object({
  email: zEmail().min(1)
});
const ZUpdatePasswordSchema = z.object({
  currentPassword: ZCurrentPasswordSchema,
  password: ZPasswordSchema
});

export { ZCurrentPasswordSchema, ZForgotPasswordSchema, ZPasswordSchema, ZResendVerifyEmailSchema, ZResetPasswordSchema, ZSignInSchema, ZSignUpSchema, ZUpdatePasswordSchema, ZVerifyEmailSchema };
//# sourceMappingURL=email-password.js.map
