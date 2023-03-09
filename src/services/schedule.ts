import { Schedule } from '@prisma/client';
import { z } from 'zod';
import { api } from '../lib/api';
import { createScheduleFormsSchema } from '../schemas/schedule.schemas';

const getAWeek = async (week?: string) => {
  const { data } = await api.get<Schedule[]>('/api/schedule/week', {
    params: {
      startWeekBy: week,
    },
  });

  return data.map((schedule) => ({
    ...schedule,
    startDate: new Date(schedule.startDate),
    endDate: new Date(schedule.endDate),
  }));
};

type CreateScheduleFormsSchema = z.infer<typeof createScheduleFormsSchema>;

const create = async (schedule: CreateScheduleFormsSchema) => {
  const { data } = await api.post<Schedule>('/api/schedule', schedule);
  
  const scheduleCreated = { ...data };
  
  scheduleCreated.startDate = new Date(scheduleCreated.startDate);
  scheduleCreated.endDate = new Date(scheduleCreated.endDate);
  
  return scheduleCreated;
};

type ScheduleToUpdate = CreateScheduleFormsSchema & Pick<Schedule, 'id'>;

const update = async (schedule: ScheduleToUpdate) => {
  const { data } = await api.put<Schedule>(`/api/schedule/${schedule.id}`, schedule);

  const scheduleUpdated = { ...data };

  scheduleUpdated.startDate = new Date(scheduleUpdated.startDate);
  scheduleUpdated.endDate = new Date(scheduleUpdated.endDate);

  return scheduleUpdated;
};

const deleteOne = async (scheduleId: string) => {
  const { data } = await api.delete<Schedule>(`/api/schedule/${scheduleId}`);

  const scheduleDeleted = { ...data };

  scheduleDeleted.startDate = new Date(scheduleDeleted.startDate);
  scheduleDeleted.endDate = new Date(scheduleDeleted.endDate);

  return scheduleDeleted;
};

const scheduleServices = {
  getAWeek,
  create,
  update,
  deleteOne,
};

export default scheduleServices;
