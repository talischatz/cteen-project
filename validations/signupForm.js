import { format, parse } from 'date-fns';
import * as z from 'zod';

const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

const birthDateValidator = z.string()
  .refine(value => dateRegex.test(value), {
    message: 'La fecha de nacimiento debe tener el formato DD/MM/YYYY',
  })
  .refine(value => {
    try {
      parse(value, 'dd/MM/yyyy', new Date());
      return true;
    } catch (error) {
      return false;
    }
  });

export const SignupFormSchema = z.object({
  first_name: z.string()
    .refine(value => !!value, { message: 'El nombre es requerido' })
    .refine(value => value.length >= 2, {
      message: 'El nombre debe tener al menos 2 caracteres',
    }),

  last_name: z.string()
    .refine(value => !!value, { message: 'El apellido es requerido' })
    .refine(value => value.length >= 2, {
      message: 'El apellido debe tener al menos 2 caracteres',
    }),

  born_date: birthDateValidator,

  address: z.string()
    .refine(value => !!value, { message: 'La dirección es requerida' })
    .refine(value => value.length >= 5, {
      message: 'La dirección debe tener al menos 5 caracteres',
    }),

  email: z.string()
    .refine(value => !!value, { message: 'El email es requerido' })
    .refine(value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value), {
      message: 'El email no es válido',
    }),

  password: z.string()
    .refine(value => !!value, { message: 'La contraseña es requerida' })
    .refine(value => value.length >= 6, {
      message: 'La contraseña debe tener al menos 6 caracteres',
    })
    .refine(value => value.length <= 30, {
      message: 'La contraseña debe tener como máximo 30 caracteres',
    }),
});
