import { Schedule } from '@prisma/client';
import { useEffect, useState } from 'react';
import scheduleServices from '../../services/schedule';
import { ListSchedulesOfADay } from '../Lists/ListSchedulesOfADay';

export const PanelSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const getSchedulesThisWeek = async () => {
      const schedulesFromApi = await scheduleServices.getAWeek();

      setSchedules(schedulesFromApi);
    };

    getSchedulesThisWeek();
  }, []);

  const firstDate = new Date();

  const secondDate = new Date(firstDate);
  const thirdDate = new Date(firstDate);
  const fourthDate = new Date(firstDate);
  const fifthDate = new Date(firstDate);
  const sixthDate = new Date(firstDate);

  secondDate.setDate(firstDate.getDate() + 1);
  thirdDate.setDate(firstDate.getDate() + 2);
  fourthDate.setDate(firstDate.getDate() + 3);
  fifthDate.setDate(firstDate.getDate() + 4);
  sixthDate.setDate(firstDate.getDate() + 5);

  return (
    <div>
      <ListSchedulesOfADay
        date={firstDate}
        schedules={schedules.filter((schedule) => schedule.startDate.getDate() === firstDate.getDate())}
      />
      <ListSchedulesOfADay
        date={secondDate}
        schedules={schedules.filter((schedule) => schedule.startDate.getDate() === secondDate.getDate())}
      />
      <ListSchedulesOfADay
        date={thirdDate}
        schedules={schedules.filter((schedule) => schedule.startDate.getDate() === thirdDate.getDate())}
      />
      <ListSchedulesOfADay
        date={fourthDate}
        schedules={schedules.filter((schedule) => schedule.startDate.getDate() === fourthDate.getDate())}
      />
      <ListSchedulesOfADay
        date={fifthDate}
        schedules={schedules.filter((schedule) => schedule.startDate.getDate() === fifthDate.getDate())}
      />
      <ListSchedulesOfADay
        date={sixthDate}
        schedules={schedules.filter((schedule) => schedule.startDate.getDate() === sixthDate.getDate())}
      />
    </div>
  );
};
