import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string({
    required_error: 'Nome é requerido.',
  })
    .min(3, { message: 'Nome precisa ter pelo menos 3 caracteres.' }),
  birthDate: z.date({
    required_error: 'Data de nascimento é requerida.',
    invalid_type_error: 'Data inválida.',
  })
    .refine((date) => date.setDate(date.getDate() + 1)),
  drink: z.string().transform((bool) => bool === 'true'),
  smoke: z.string().transform((bool) => bool === 'true'),
  children: z.string().transform((num) => Number(num)).optional(),
  sleep: z.enum(['Bom', 'Ruim', 'Regular']),
  feeding: z.enum(['Bom', 'Ruim', 'Regular']),
  drinkWater: z.string().transform((num) => Number(num)),
  intestine: z.enum(['Bom', 'Ruim', 'Regular']),
  surgeries: z.string().optional(),
  illnesses: z.string().optional(),
  medicines: z.string().optional(),
  illnessesInFamily: z.string().optional(),
  mentalHealth: z.string().optional(),
  otherTreatments: z.string().optional(),
  indication: z.string().optional(),
  startingWeight: z.string().transform((num) => Number(num)).optional(),
  description: z.string().optional(),
  measures: z.object({
    rightArm: z.string().transform((num) => Number(num)).optional(),
    leftArm: z.string().transform((num) => Number(num)).optional(),
    chest: z.string().transform((num) => Number(num)).optional(),
    waist: z.string().transform((num) => Number(num)).optional(),
    hips: z.string().transform((num) => Number(num)).optional(),
    butt: z.string().transform((num) => Number(num)).optional(),
    rightThigh: z.string().transform((num) => Number(num)).optional(),
    leftThigh: z.string().transform((num) => Number(num)).optional(),
    rightCalf: z.string().transform((num) => Number(num)).optional(),
    leftCalf: z.string().transform((num) => Number(num)).optional(),
    height: z.string().transform((num) => Number(num)).optional(),
  }).optional(),
});
