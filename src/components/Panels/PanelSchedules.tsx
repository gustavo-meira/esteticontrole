import { Schedule } from '@prisma/client';
import { useEffect, useState } from 'react';
import scheduleServices from '../../services/schedule';
import { ButtonForwardBackward } from '../Buttons/ButtonForwardBackward';
import { ListSchedulesOfADay } from '../Lists/ListSchedulesOfADay';

export const PanelSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [currWeek, setCurrWeek] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    const getSchedulesThisWeek = async () => {
      const schedulesFromApi = await scheduleServices.getAWeek(currWeek);

      setSchedules(schedulesFromApi);
    };

    getSchedulesThisWeek();
  }, [currWeek]);

  const [currYear, currMonth, currDay] = currWeek.split('-');
  const firstDate = new Date();

  firstDate.setFullYear(Number(currYear), Number(currMonth) - 1, Number(currDay));

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
  
  const moveDateBackwardsOrForwards = (direction: 'backward' | 'forward') => {
    if (direction === 'backward') firstDate.setDate(firstDate.getDate() - 1);
    else if (direction === 'forward') firstDate.setDate(firstDate.getDate() + 1);

    setCurrWeek(firstDate.toISOString().slice(0, 10));
  };

  return (
    <div>
      <ButtonForwardBackward
        direction="backward"
        onClick={() => moveDateBackwardsOrForwards('backward')}
      />
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
      <ButtonForwardBackward
        direction="forward"
        onClick={() => moveDateBackwardsOrForwards('forward')}
      />
    </div>
  );
};
