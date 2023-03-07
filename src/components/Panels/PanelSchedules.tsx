import { useDisclosure } from '@chakra-ui/react';
import { Schedule } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import scheduleServices from '../../services/schedule';
import { AlertCreateSchedule } from '../Alerts/AlertCreateSchedule';
import { ButtonForwardBackward } from '../Buttons/ButtonForwardBackward';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { ListSchedulesOfADay } from '../Lists/ListSchedulesOfADay';

export const PanelSchedules = () => {
  const [currWeek, setCurrWeek] = useState(new Date().toISOString().slice(0, 10));
  const { data: schedules, refetch } = useQuery<Schedule[]>(['schedules'],
    () => scheduleServices.getAWeek(currWeek),
    { refetchOnWindowFocus: false }
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    refetch();
  }, [currWeek]);

  if (!schedules) return null;

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
      <input
        type="date"
        value={currWeek}
        onChange={(e) => {
          const [year] = e.target.value.split('-');
          if (Number(year) > 2000) setCurrWeek(e.target.value);
        }}
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
      <ButtonPrimary
        onClick={onOpen}
      >
        Agendar
      </ButtonPrimary>
      <AlertCreateSchedule
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};
