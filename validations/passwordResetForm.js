import * as z from 'zod';

export const PasswordResetSchema = z.object({
  otp: z.string()
    .refine(value => !!value, { message: 'El código OTP es requerido' })
    .refine(value => /^[0-9]{4,6}$/.test(value), {
      message: 'El código OTP debe ser de 4 a 6 dígitos numéricos',
    }),
  newPassword: z.string()
    .refine(value => !!value, { message: 'La contraseña es requerida' })
    .refine(value => value.length >= 8, {
      message: 'La contraseña debe tener al menos 8 caracteres',
    }),
  confirmPassword: z.string()
    .refine(value => !!value, { message: 'La confirmación de contraseña es requerida' })
    .refine((value, context) => value === context['newPassword'], {
      message: 'Las contraseñas no coinciden',
    }),
});
