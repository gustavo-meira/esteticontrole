import { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodError } from 'zod';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['PUT', 'PATCH'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'PUT') {
    const id = req.query.id;

    const packageToEditSchema = z.object({
      id: z.string().cuid(),
      clientId: z.string().cuid(),
      date: z.string().datetime().nullish(),
      paid: z.boolean().optional(),
      treatment: z.string().nullable(),
      value: z.number().nullable(),
    });

    try {
      const packageToEdit = packageToEditSchema.parse({ ...req.body, id });

      const packageEdited = await prisma.package.update({
        where: {
          id: packageToEdit.id,
        },
        data: packageToEdit,
      });
  
      res.status(200).json(packageEdited);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  }

  if (req.method === 'PATCH') {
    const id = req.query.id;

    const packageToEditSchema = z.object({
      id: z.string().cuid(),
      paid: z.boolean(),
    });

    try {
      const packageToEdit = packageToEditSchema.parse({ ...req.body, id });

      const packageEdited = await prisma.package.update({
        where: {
          id: packageToEdit.id,
        },
        data: {
          paid: packageToEdit.paid,
        },
      });

      res.status(200).json(packageEdited);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  }
};

export default handler;
