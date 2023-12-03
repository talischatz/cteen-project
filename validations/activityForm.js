import { format, parse } from 'date-fns';
import * as z from 'zod';

const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

const activityDateValidator = z.string()
  .refine(value => dateRegex.test(value), {
    message: 'La fecha de la actividad debe tener el formato DD/MM/YYYY',
  })
  .refine(value => {
    try {
      // Intentar analizar la fecha para asegurarse de que es válida
      parse(value, 'dd/MM/yyyy', new Date());
      return true;
    } catch (error) {
      return false;
    }
  });

export const ActivityFormSchema = z.object({
  activity_name: z.string()
    .refine(value => !!value, { message: 'El nombre de la actividad es requerido' })
    .refine(value => value.length >= 2, {
      message: 'El nombre de la actividad debe tener al menos 2 caracteres',
    })
    .refine(value => value.length <= 30, {
      message: 'El nombre de la actividad debe tener como máximo 30 caracteres',
    }),
  activity_date: activityDateValidator,
  activity_leader: z.string()
    .refine(value => !!value, { message: 'El nombre del líder de la actividad es requerido' })
    .refine(value => value.length >= 2, {
      message: 'El nombre de la actividad debe tener al menos 2 caracteres',
    })
    .refine(value => value.length <= 30, {
      message: 'El nombre de la actividad debe tener como máximo 30 caracteres',
    }),
});
