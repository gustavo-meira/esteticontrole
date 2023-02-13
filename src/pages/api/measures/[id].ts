import { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodError } from 'zod';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['PUT', 'DELETE'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'PUT') {
    const id = req.query.id;

    const measureStringToNumberOrNullSchema = z
      .string()
      .transform((value) => Number(value))
      .transform((num) => num === 0 ? null : num)
      .optional();

    const measuresToEditSchema = z.object({
      id: z.string().cuid(),
      clientId: z.string().cuid(),
      measuredDate: z.string()
        .transform((value) => new Date(value))
        .refine((date) => date.setDate(date.getDate() + 1))
        .optional(),
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
      const measuresToEdit = measuresToEditSchema.parse({ ...req.body, id });

      const measuresEdited = await prisma.measures.update({
        where: {
          id: measuresToEdit.id,
        },
        data: measuresToEdit,
      });

      res.status(200).json(measuresEdited);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  }
};

export default handler;
