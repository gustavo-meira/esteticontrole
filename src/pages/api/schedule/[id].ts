import { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodError } from 'zod';
import { scheduleToCreateOrUpdateSchema } from '../../../api/schemas/ScheduleSchemas';
import { checkScheduleConflicts } from '../../../api/utils/checkScheduleConflicts';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['PUT', 'DELETE'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'PUT') {
    const scheduleIdSchema = z.string().cuid();
    const scheduleToUpdateSchema = scheduleToCreateOrUpdateSchema.merge(z.object({
      id: scheduleIdSchema,
    }));

    try {
      const {
        clientName,
        duration,
        id,
        startDate,
        notes,
        treatment,
      } = scheduleToUpdateSchema.parse({ ...req.body, id: req.query.id });

      const endDate = new Date(startDate);
    
      endDate.setMinutes(startDate.getMinutes() + duration);

      const scheduleConflict = await checkScheduleConflicts(startDate, endDate, id);

      if (scheduleConflict) return res.status(409).send({ message: 'You already have a schedule on this hour.' });

      const scheduleEdited = await prisma.schedule.update({
        where: {
          id,
        },
        data: {
          clientName,
          endDate,
          notes,
          startDate,
          treatment,
        },
      });

      res.status(200).json(scheduleEdited);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  }

  if (req.method === 'DELETE') {
    const scheduleIdSchema = z.string().cuid();

    try {
      const id = scheduleIdSchema.parse(req.query.id);

      const scheduleDeleted = await prisma.schedule.delete({
        where: {
          id,
        },
      });

      res.status(200).send(scheduleDeleted);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  }
};

export default handler;
