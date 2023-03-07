import { z } from 'zod';

export const createScheduleFormsSchema  = z.object({
  clientName: z.string()
    .min(3, {
      message: 'O nome do cliente precisa de no mínimo 3 letras.',
    }),
  treatment: z.string().optional(),
  notes: z.string().optional(),
  startDate: z.string()
    .regex(/^(19|20)\d\d-(0[1-9]|1[012])-([012]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'A data precisa estar completa.',
    }),
  duration: z.string()
    .regex(/^\d{2,3}$/, {
      message: 'Favor escolher alguma das opções.',
    }),
});
