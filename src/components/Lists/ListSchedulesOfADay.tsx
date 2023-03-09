import { useDisclosure } from '@chakra-ui/react';
import { Schedule } from '@prisma/client';
import { useEffect, useState } from 'react';
import { getHourAndMinutesFromDate } from '../../utils/getHourAndMinutesFromDate';
import { AlertEditSchedule } from '../Alerts/AlertEditSchedule';

type ListSchedulesOfADayProps = {
  date: Date;
  schedules: Schedule[];
};

const daysOfWeek = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

export const ListSchedulesOfADay = ({ schedules, date }: ListSchedulesOfADayProps) => {
  const [scheduleToEdit, setScheduleToEdit] = useState<null | Schedule>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (scheduleToEdit) onOpen();
  }, [scheduleToEdit]);

  const onCloseAlert = () => {
    setScheduleToEdit(null);
    onClose();
  };

  const listDay = `${daysOfWeek[date.getDay()]} | ${date.toLocaleDateString('pt-BR')}`;

  return (
    <div>
      <h2>{listDay}</h2>
      {
        schedules.map((schedule) => {
          const scheduleStartHour = getHourAndMinutesFromDate(schedule.startDate);
          const scheduleEndHour = getHourAndMinutesFromDate(schedule.endDate);

          return (
            <button onClick={() => setScheduleToEdit(schedule)} key={schedule.id}>
              <h3>{schedule.clientName}</h3>
              <p>{`${scheduleStartHour} ~ ${scheduleEndHour}`}</p>
              <p>{schedule.treatment || 'Tratamento não definido'}</p>
            </button>
          );})
      }
      { isOpen &&
        scheduleToEdit &&
        (
          <AlertEditSchedule
            schedule={scheduleToEdit}
            isOpen={isOpen}
            onClose={onCloseAlert}
          />
        )
      }
    </div>
  );
};
