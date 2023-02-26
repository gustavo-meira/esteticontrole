import { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodError } from 'zod';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['GET', 'POST'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'GET') {
    const clientIdSchema = z.string({
      required_error: 'clientId is required.',
      invalid_type_error: 'clientId must be a string.',
    }).cuid({
      message: 'clientId must be a cuid.',
    });

    try {
      const clientId = clientIdSchema.parse(req.body.clientId);

      const services = await prisma.service.findMany({
        where: {
          clientId,
        },
      });
    
      res.status(200).json(services);
    } catch (err) {

      if (err instanceof ZodError) {
        res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  }

  if (req.method === 'POST') {
    const serviceToCreateSchema = z.object({
      clientId: z.string({
        required_error: 'clientId is required.',
      }).cuid({
        message: 'clientId must be a cuid.',
      }),
      date: z.string().datetime().transform((date) => new Date(date)).optional(),
      treatment: z.string().optional(),
      value: z.number().optional(),
      paid: z.boolean().optional(),
    });

    try {
      const serviceToCreate = serviceToCreateSchema.parse(req.body);

      const serviceCreated = await prisma.service.create({
        data: serviceToCreate,
      });

      res.status(201).json(serviceCreated);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  }
};

export default handler;
