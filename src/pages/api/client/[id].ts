import { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodError } from 'zod';
import { clientToCreateOrUpdateSchema } from '../../../api/schemas/ClientSchemas';
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

    const acceptedParamsSchema = z.object({
      id: z.string().cuid(),
      measures: z.string()
        .transform((value) => value === 'true')
        .default('false'),
      services: z.string()
        .transform((value) => value === 'true')
        .default('false'),
    });

    try {
      const {
        id,
        measures,
        services,
      } = acceptedParamsSchema.parse({ ...req.query });

      const client = await prisma.client.findFirst({
        where: {
          id,
        },
        include: {
          measures,
          services,
        },
      });
    
      res.status(200).json(client);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  
  }

  if (req.method === 'PUT') {
    try {
      const idSchema = z.string().cuid();
      const id = idSchema.parse(req.query.id);
      const dataParsed = clientToCreateOrUpdateSchema.parse(req.body);
      const clientUpdated = await prisma.client.update({
        where: {
          id,
        },
        data: {
          ...dataParsed,
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
