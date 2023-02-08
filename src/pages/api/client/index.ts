import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['GET', 'POST'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'GET') {
    const clients = await prisma.client.findMany({});
  
    res.status(200).json(clients);
  }

  if (req.method === 'POST') {
    const clientToCreateSchema = z.object({
      name: z.string(),
      birthDate: z.string()
        .transform((birthDate) => new Date(birthDate))
        .refine((date) => date.setDate(date.getDate() + 1)),
      drink: z.enum(['true', 'false']).transform((value) => value === 'true'),
      smoke: z.enum(['true', 'false']).transform((value) => value === 'true'),
      children: z.string().transform((value) => Number(value)).optional(),
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
      startingWeight: z.string().transform((value) => Number(value)).optional(),
      description: z.string().optional(),
      measures: z.object({
        rightArm: z.string().transform((value) => Number(value)).optional(),
        leftArm: z.string().transform((value) => Number(value)).optional(),
        chest: z.string().transform((value) => Number(value)).optional(),
        waist: z.string().transform((value) => Number(value)).optional(),
        hips: z.string().transform((value) => Number(value)).optional(),
        butt: z.string().transform((value) => Number(value)).optional(),
        rightThigh: z.string().transform((value) => Number(value)).optional(),
        leftThigh: z.string().transform((value) => Number(value)).optional(),
        rightCalf: z.string().transform((value) => Number(value)).optional(),
        leftCalf: z.string().transform((value) => Number(value)).optional(),
        height: z.string().transform((value) => Number(value)).optional(),
      }).optional(),
    });

    try {
      const dataParsed = clientToCreateSchema.parse(req.body);
      const clientCreated = await prisma.client.create({
        data: {
          ...dataParsed,
          measures: {
            create: dataParsed.measures,
          },
        },
        include: {
          measures: true,
        },
      });
  
      res.status(201).json(clientCreated);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

export default handler;
