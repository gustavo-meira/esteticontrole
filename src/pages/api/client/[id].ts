import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['GET', 'PUT'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!acceptedMethods.includes(req.method as string)) {
    return res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'GET') {
    if (typeof req.query.id !== 'string') {
      return res.status(400).json({ message: 'id must be a string.' });
    }
  
    const client = await prisma.client.findFirst({
      where: {
        id: req.query.id,
      },
      include: {
        measures: true,
        packages: true,
      },
    });
  
    res.status(200).json(client);
  }

  if (req.method === 'PUT') {
    const id = req.query.id as string;

    const editClientSchema = z.object({
      name: z.string(),
      birthDate: z.string()
        .transform((birthDate) => new Date(birthDate))
        .refine((date) => date.setDate(date.getDate() + 1)),
      drink: z.string().transform((value) => value === 'true'),
      smoke: z.string().transform((value) => value === 'true'),
      children: z.string().transform((value) => Number(value)).transform((num) => num === 0 ? null : num).optional(),
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
      startingWeight: z.string().transform((value) => Number(value)).transform((num) => num === 0 ? null : num).optional(),
      description: z.string().optional(),
      measures: z.object({
        rightArm: z.string().transform((value) => Number(value)).transform((num) => num === 0 ? null : num).optional(),
        leftArm: z.string().transform((value) => Number(value)).transform((num) => num === 0 ? null : num).optional(),
        chest: z.string().transform((value) => Number(value)).transform((num) => num === 0 ? null : num).optional(),
        waist: z.string().transform((value) => Number(value)).transform((num) => num === 0 ? null : num).optional(),
        hips: z.string().transform((value) => Number(value)).transform((num) => num === 0 ? null : num).optional(),
        butt: z.string().transform((value) => Number(value)).transform((num) => num === 0 ? null : num).optional(),
        rightThigh: z.string().transform((value) => Number(value)).transform((num) => num === 0 ? null : num).optional(),
        leftThigh: z.string().transform((value) => Number(value)).transform((num) => num === 0 ? null : num).optional(),
        rightCalf: z.string().transform((value) => Number(value)).transform((num) => num === 0 ? null : num).optional(),
        leftCalf: z.string().transform((value) => Number(value)).transform((num) => num === 0 ? null : num).optional(),
        height: z.string().transform((value) => Number(value)).transform((num) => num === 0 ? null : num).optional(),
      }).optional(),
    });

    try {
      const dataParsed = editClientSchema.parse(req.body);
      const clientUpdated = await prisma.client.update({
        where: {
          id,
        },
        data: {
          ...dataParsed,
          measures: {
            update: dataParsed.measures,
          },
        },
        include: {
          measures: true,
        },
      });
  
      res.status(201).json(clientUpdated);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

export default handler;
