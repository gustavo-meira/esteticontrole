import { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodError } from 'zod';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['POST'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'POST') {
    const measureStringToNumberOrNullSchema = z
      .string()
      .transform((value) => Number(value))
      .transform((num) => num === 0 ? null : num)
      .optional();

    const measuresToCreateSchema = z.object({
      clientId: z.string().cuid(),
      rightArm: measureStringToNumberOrNullSchema,
      leftArm: measureStringToNumberOrNullSchema,
      chest: measureStringToNumberOrNullSchema,
      waist: measureStringToNumberOrNullSchema,
      hips: measureStringToNumberOrNullSchema,
      butt: measureStringToNumberOrNullSchema,
      rightThigh: measureStringToNumberOrNullSchema,
      leftThigh: measureStringToNumberOrNullSchema,
      rightCalf: measureStringToNumberOrNullSchema,
      leftCalf: measureStringToNumberOrNullSchema,
      height: measureStringToNumberOrNullSchema,
      weight: measureStringToNumberOrNullSchema,
    });

    try {
      const measuresToCreate = measuresToCreateSchema.parse(req.body);

      const measureCreated = await prisma.measures.create({
        data: measuresToCreate,
      });

      res.status(201).json(measureCreated);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  }
};

export default handler;
