import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string({
    required_error: 'Nome é requerido.',
  })
    .min(3, { message: 'Nome precisa ter pelo menos 3 caracteres.' }),
  birthDate: z.string({
    required_error: 'Data de nascimento é requerida.',
  }),
  drink: z.string(),
  smoke: z.string(),
  children: z.string().optional(),
  sleep: z.string(),
  feeding: z.string(),
  drinkWater: z.string(),
  intestine: z.string(),
  surgeries: z.string().optional(),
  illnesses: z.string().optional(),
  medicines: z.string().optional(),
  illnessesInFamily: z.string().optional(),
  mentalHealth: z.string().optional(),
  otherTreatments: z.string().optional(),
  indication: z.string().optional(),
  description: z.string().optional(),
});
