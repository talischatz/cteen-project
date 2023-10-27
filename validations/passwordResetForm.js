import * as z from 'zod';

export const PasswordResetSchema = z.object({
  // otp: z.string()
  //   .nonempty({ message: 'El código OTP es requerido' })
  //   .regex(/^[a-zA-Z0-9]{4,10}$/, { message: 'El código OTP debe ser alfanumérico y tener de 4 a 10 caracteres' }),
  email: z.string()
    .nonempty({ message: 'El email es requerido' })
    .email({ message: 'El email no es válido' }),
  newPassword: z.string()
    .nonempty({ message: 'La contraseña es requerida' })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  confirmPassword: z.string()
    .nonempty({ message: 'La confirmación de contraseña es requerida' })
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
});





// import * as z from 'zod';

// export const PasswordResetSchema = z.object({
//   otp: z.string()
//   .refine(value => !!value, { message: 'El código OTP es requerido' })
//   .refine(value => /^[a-zA-Z0-9]{4,10}$/.test(value), {
//     message: 'El código OTP debe ser alfanumérico y tener de 4 a 10 caracteres',
//   }),
//   newPassword: z.string()
//     .refine(value => !!value, { message: 'La contraseña es requerida' })
//     .refine(value => value.length >= 8, {
//       message: 'La contraseña debe tener al menos 8 caracteres',
//     }),
//   confirmPassword: z.string()
//     .refine(value => !!value, { message: 'La confirmación de contraseña es requerida' })
//     .refine((value, context) => value === context['newPassword'], {
//       message: 'Las contraseñas no coinciden',
//     }),
// });

