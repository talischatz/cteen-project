import * as z from 'zod';

export const PasswordRecoverySchema = z.object({
  recovery_email: z.string()
    .refine(value => !!value, { message: 'El email es requerido' })
    .refine(value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value), {
      message: 'El email no es válido',
    }),
});
