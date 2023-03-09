import { Schedule } from '@prisma/client';
import { createScheduleFormsSchema } from '../schemas/schedule.schemas';
import { z } from 'zod';

type CreateScheduleFormsSchema = z.infer<typeof createScheduleFormsSchema>;

export const serializeScheduleToForms = (schedule?: Schedule | null): CreateScheduleFormsSchema | undefined => {
  if (!schedule) return;

  const scheduleDurationInMs = schedule.endDate.getTime() - schedule.startDate.getTime();
  const scheduleDurationInSec = scheduleDurationInMs / 1000;
  const scheduleDurationInMin = scheduleDurationInSec / 60;

  const scheduleStartDay = schedule.startDate.toISOString().slice(0, 10);
  const scheduleStartTime = schedule.startDate.toLocaleTimeString('pt-BR').slice(0, 5);

  return {
    clientName: schedule.clientName,
    duration: scheduleDurationInMin.toString(),
    startDate: `${scheduleStartDay}T${scheduleStartTime}`,
    notes: schedule.notes || undefined,
    treatment: schedule.treatment || undefined,
  };
};
