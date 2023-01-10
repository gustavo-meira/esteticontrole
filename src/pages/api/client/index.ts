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
  
    res.status(200).json({ clients });
  }

  if (req.method === 'POST') {
    const clientToCreateSchema = z.object({
      name: z.string(),
      birthDate: z.string()
        .datetime()
        .refine((birthDate) => new Date(birthDate)),
      drink: z.boolean(),
      smoke: z.boolean(),
      children: z.number().optional(),
      sleep: z.enum(['Bom', 'Ruim', 'Regular']),
      feeding: z.enum(['Bom', 'Ruim', 'Regular']),
      drinkWater: z.number(),
      intestine: z.enum(['Bom', 'Ruim', 'Regular']),
      surgeries: z.string().optional(),
      illnesses: z.string().optional(),
      medicines: z.string().optional(),
      illnessesInFamily: z.string().optional(),
      mentalHealth: z.string().optional(),
      otherTreatments: z.string().optional(),
      indication: z.string().optional(),
      startingWeight: z.number().optional(),
      description: z.string().optional(),
      measures: z.object({
        rightArm: z.number().optional(),
        leftArm: z.number().optional(),
        chest: z.number().optional(),
        waist: z.number().optional(),
        hips: z.number().optional(),
        butt: z.number().optional(),
        rightThigh: z.number().optional(),
        leftThigh: z.number().optional(),
        rightCalf: z.number().optional(),
        leftCalf: z.number().optional(),
        height: z.number().optional(),
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
