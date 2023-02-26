import { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodError } from 'zod';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['PUT', 'PATCH', 'DELETE'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'PUT') {
    const id = req.query.id;

    const serviceToEditSchema = z.object({
      id: z.string().cuid(),
      clientId: z.string().cuid(),
      date: z.string().datetime().nullish(),
      paid: z.boolean().optional(),
      treatment: z.string().nullable(),
      value: z.number().nullable(),
    });

    try {
      const serviceToEdit = serviceToEditSchema.parse({ ...req.body, id });

      const serviceEdited = await prisma.service.update({
        where: {
          id: serviceToEdit.id,
        },
        data: serviceToEdit,
      });
  
      res.status(200).json(serviceEdited);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  }

  if (req.method === 'PATCH') {
    const id = req.query.id;

    const serviceToEditSchema = z.object({
      id: z.string().cuid(),
      paid: z.boolean(),
    });

    try {
      const serviceToEdit = serviceToEditSchema.parse({ ...req.body, id });

      const serviceEdited = await prisma.service.update({
        where: {
          id: serviceToEdit.id,
        },
        data: {
          paid: serviceToEdit.paid,
        },
      });

      res.status(200).json(serviceEdited);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  }

  if (req.method === 'DELETE') {
    const id = req.query.id;
    
    const idServiceToDeleteSchema = z.string({
      invalid_type_error: 'id must be a string',
    }).cuid({
      message: 'id must be a cuid',
    });

    try {
      const idServiceToDelete = idServiceToDeleteSchema.parse(id);
  
      const serviceDeleted = await prisma.service.delete({
        where: {
          id: idServiceToDelete,
        },
      });
  
      res.status(200).json(serviceDeleted);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  } 
};

export default handler;
