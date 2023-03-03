import { z } from 'zod';

export const clientToCreateOrUpdateSchema = z.object({
  name: z.string(),
  birthDate: z.string()
    .regex(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, {
      message: 'birth date must be in "yyyy-mm-dd" format',
    })
    .transform((birthDate) => {
      const date = new Date();
      const [year, month, day] = birthDate.split('-');
      date.setFullYear(Number(year));
      date.setMonth(Number(month) - 1);
      date.setDate(Number(day));
      return date;
    }),
  drink: z.string().transform((value) => value === 'true'),
  smoke: z.string().transform((value) => value === 'true'),
  children: z.string()
    .transform((value) => Number(value))
    .transform((num) => num === 0 ? null : num)
    .optional(),
  sleep: z.enum(['Bom', 'Ruim', 'Regular']),
  feeding: z.enum(['Bom', 'Ruim', 'Regular']),
  drinkWater: z.string().transform((value) => Number(value)),
  intestine: z.enum(['Bom', 'Ruim', 'Regular']),
  surgeries: z.string().optional(),
  illnesses: z.string().optional(),
  medicines: z.string().optional(),
  illnessesInFamily: z.string().optional(),
  mentalHealth: z.string().optional(),
  otherTreatments: z.string().optional(),
  indication: z.string().optional(),
  description: z.string().optional(),
  profession: z.string().optional(),
});
