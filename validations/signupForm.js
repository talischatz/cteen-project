import { format } from 'date-fns';
import * as z from 'zod';

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

    born_date: z.string().refine((string) => {
      // Verifica que la longitud sea de 10 caracteres
      return string.length < 15;
    }, { message: 'La fecha de nacimiento debe tener 10 caracteres' }).transform((string) => {
      // Transforma el string de fecha al formato deseado
      const parsedDate = new Date(string);
      return format(parsedDate, 'yyyy-MM-dd'); // Ajusta el formato según tus necesidades
    }),

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
