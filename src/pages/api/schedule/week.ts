import { NextApiHandler } from 'next';
import { ZodError } from 'zod';
import { scheduleByWeekSchema } from '../../../api/schemas/ScheduleSchemas';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['GET'];

const handler: NextApiHandler = async (req, res) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'GET') {
    try {
      const { startWeekBy } = scheduleByWeekSchema.parse(req.query);

      const endDate = new Date(startWeekBy);
      endDate.setHours(23, 59, 59, 999);
      endDate.setDate(endDate.getDate() + 5);

      const schedulesOfTheWeek = await prisma.schedule.findMany({
        where: {
          startDate: {
            gte: startWeekBy,
            lte: endDate,
          },
        },
        orderBy: {
          startDate: 'desc',
        },
      });

      res.status(200).json(schedulesOfTheWeek);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.message });
      }

      res.status(500).send({});
    }
  }
};

export default handler;
