import { NextApiHandler } from 'next';
import { ZodError } from 'zod';
import { scheduleToCreateOrUpdateSchema } from '../../../api/schemas/ScheduleSchemas';
import { checkScheduleConflicts } from '../../../api/utils/checkScheduleConflicts';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['POST'];

const handler: NextApiHandler = async (req, res) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'POST') {
    try {
      const {
        clientName,
        treatment,
        notes,
        startDate,
        duration,
      } = scheduleToCreateOrUpdateSchema.parse(req.body);
    
      const endDate = new Date(startDate);
    
      endDate.setMinutes(startDate.getMinutes() + duration);

      const scheduleConflict = await checkScheduleConflicts(startDate, endDate);

      if (scheduleConflict) return res.status(409).send({ message: 'You already have a schedule on this hour.' });

      const scheduleCreated = await prisma.schedule.create({
        data: {
          clientName,
          endDate,
          startDate,
          notes,
          treatment,
        },
      });
    
      res.status(200).json(scheduleCreated);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  }

};

export default handler;
