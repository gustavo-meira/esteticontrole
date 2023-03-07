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


const scheduleServices = {
  getAWeek,
  create,
};

export default scheduleServices;
