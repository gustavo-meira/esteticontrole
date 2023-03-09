import { prisma } from '../../lib/prisma';

export const checkScheduleConflicts = async (startDate: Date, endDate: Date, id?: string): Promise<boolean> => {
  const scheduleConflict = await prisma.schedule.findFirst({
    where: {
      NOT: {
        id,
      },
      OR: [
        {
          startDate: {
            lt: endDate,
            gt: startDate,
          },
        },
        {
          endDate: {
            lt: endDate,
            gt: startDate,
          },
        },
        {
          AND: [
            {
              startDate: {
                lt: startDate,
              },
              endDate: {
                gt: endDate,
              },
            },
          ],
        },
      ],
    },
  });

  return Boolean(scheduleConflict);
};
