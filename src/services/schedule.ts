import { Schedule } from '@prisma/client';
import { api } from '../lib/api';

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


const scheduleServices = {
  getAWeek,
};

export default scheduleServices;
