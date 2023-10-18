import * as z from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().refine(value => !!value, {
    message: 'El campo usuario es requerido'
  }).refine(value => value.length >= 2, {
    message: 'El usuario debe tener al menos 2 caracteres'
  }),
  password: z.string().refine(value => !!value, {
    message: 'La contraseña es requerida'
  }).refine(value => value.length >= 2, {
    message: 'La contraseña debe tener al menos 2 caracteres'
  }),
  remember_me: z.boolean().default(false).optional(),
});
