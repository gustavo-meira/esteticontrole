import { Schedule } from '@prisma/client';
import { getHourAndMinutesFromDate } from '../../utils/getHourAndMinutesFromDate';

type CardScheduleInfoProps = {
  schedule: Schedule;
};

export const CardScheduleInfo = ({ schedule }: CardScheduleInfoProps) => {
  const scheduleStartHour = getHourAndMinutesFromDate(schedule.startDate);
  const scheduleEndHour = getHourAndMinutesFromDate(schedule.endDate);

  const scheduleDurationInMs = schedule.endDate.getTime() - schedule.startDate.getTime();
  const scheduleDurationInSec = scheduleDurationInMs / 1000;
  const scheduleDurationInMin = scheduleDurationInSec / 60;

  return (
    <div>
      <h3>{schedule.clientName}</h3>
      <p>{schedule.treatment || 'Tratamento não informado.'}</p>
      <p>{`${scheduleStartHour} ~ ${scheduleEndHour} - Duração ${scheduleDurationInMin} minutos.`}</p>
      <p>{schedule.notes || 'Nenhuma nota definida.'}</p>
    </div>
  );};
