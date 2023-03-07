import { z } from 'zod';

export const scheduleToCreateOrUpdateSchema = z.object({
  clientName: z.string().min(2),
  treatment: z.string().optional(),
  notes: z.string().optional(),
  startDate: z.string()
    .transform((date) => {
      const initialDate = new Date();
      const [fullDate, fullHour] = date.split('T');
      const [year, month, day] = fullDate.split('-');
      const [hour, minutes] = fullHour.split(':');

      initialDate.setFullYear(Number(year), Number(month) - 1, Number(day));
      initialDate.setHours(Number(hour), Number(minutes), 0, 0);

      return initialDate;
    }),
  duration: z.string()
    .regex(/^\d{2,3}$/)
    .transform((value) => Number(value)),
});

export const scheduleByWeekSchema = z.object({
  startWeekBy: z.string()
    .transform((date) => {
      const startWeekBy = new Date();
      const [year, month, day] = date.split('-');

      startWeekBy.setFullYear(Number(year), Number(month) - 1, Number(day));
      startWeekBy.setHours(0, 0, 0, 0);

      return startWeekBy;
    })
    .default(() => new Date().toISOString().slice(0, 10)),
});
