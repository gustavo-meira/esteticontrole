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
  duration: z.number(),
});
