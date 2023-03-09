import { Box, Text } from '@chakra-ui/react';
import { Schedule } from '@prisma/client';
import { Clock, FirstAid, NotePencil, User } from 'phosphor-react';
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
    <Box>
      <Text display="flex" gap="2" alignItems="center">
        <User />
        Cliente: {schedule.clientName}
      </Text>
      <Text display="flex" gap="2" alignItems="center">
        <FirstAid />
        Tratamento: {schedule.treatment || 'Tratamento não informado.'}
      </Text>
      <Text display="flex" gap="2" alignItems="center">
        <Clock />
        Duração: {`${scheduleStartHour} ~ ${scheduleEndHour} - Duração ${scheduleDurationInMin} minutos.`}
      </Text>
      <Text display="flex" gap="2" alignItems="center">
        <NotePencil />
        Notas: {schedule.notes || 'Nenhuma nota definida.'}
      </Text>
    </Box>
  );};
