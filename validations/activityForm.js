import { format } from 'date-fns';
import * as z from 'zod';

export const ActivityFormSchema = z.object({
  activity_name: z.string()
    .refine(value => !!value, { message: 'El nombre de la actividad es requerido' })
    .refine(value => value.length >= 2, {
      message: 'El nombre de la actividad debe tener al menos 2 caracteres',
    })
    .refine(value => value.length <= 30, {
      message: 'El nombre de la actividad debe tener como máximo 30 caracteres',
    }),
  activity_date: z.date({ invalid_type_error: 'La fecha de la actividad es requerida' }).transform(string => format(string, 'P')),
  activity_leader: z.string()
    .refine(value => !!value, { message: 'El nombre del lider de la actividad es requerido' })
    .refine(value => value.length >= 2, {
      message: 'El nombre de la actividad debe tener al menos 2 caracteres',
    })
    .refine(value => value.length <= 30, {
      message: 'El nombre de la actividad debe tener como máximo 30 caracteres',
    }),
});
