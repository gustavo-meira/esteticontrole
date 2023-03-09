import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Schedule } from '@prisma/client';
import { SmileySad } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { getHourAndMinutesFromDate } from '../../utils/getHourAndMinutesFromDate';
import { ModalEditSchedule } from '../Modals/ModalEditSchedule';

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
  const [animationParent] = useAutoAnimate();

  useEffect(() => {
    if (scheduleToEdit) onOpen();
  }, [scheduleToEdit]);

  const onCloseModal = () => {
    setScheduleToEdit(null);
    onClose();
  };

  const listDay = `${daysOfWeek[date.getDay()]} ${date.toLocaleDateString('pt-BR').slice(0, 5)}`;

  return (
    <Flex
      width="16%"
      flexDir="column"
      backgroundColor="#734A9136"
      borderRadius="5px"
      border="1px solid #A87BC7"
    >
      <Text
        backgroundColor="#A87BC7"
        color="white"
        p="4px 2px"
        textAlign="center"
        borderRadius="5px"
      >
        {listDay}
      </Text>
      <Flex
        flexDir="column"
        flexGrow="1"
        gap="4"
        pt="4"
        ref={animationParent}
      >
        {
          schedules.map((schedule) => {
            const scheduleStartHour = getHourAndMinutesFromDate(schedule.startDate);
            const scheduleEndHour = getHourAndMinutesFromDate(schedule.endDate);

            return (
              <Flex
                onClick={() => setScheduleToEdit(schedule)}
                key={schedule.id}
                display="flex"
                flexDir="column"
                height="fit-content"
                backgroundColor="#FFFFFF"
                borderRadius="5px"
                textAlign="left"
                pl="1"
                role="button"
                tabIndex={0}
              >
                <Text
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  fontSize="lg"
                >
                  {schedule.clientName}
                </Text>
                <Text
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  fontSize="sm"
                >
                  {`${scheduleStartHour} ~ ${scheduleEndHour}`}
                </Text>
                <Text
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  fontSize="sm"
                >
                  {schedule.treatment || 'Tratamento não definido'}
                </Text>
              </Flex>
            );
          })
        }
        {
          schedules.length === 0 && (
            <Flex
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              flexGrow="1"
              opacity=".6"
            >
              <SmileySad size="32" />
              <Text
                textAlign="center"
                fontSize="sm"
                mb="12"
              >
                Você não possui agendamentos para hoje
              </Text>
            </Flex>
          )
        }
      </Flex>
      { isOpen &&
        scheduleToEdit &&
        (
          <ModalEditSchedule
            schedule={scheduleToEdit}
            isOpen={isOpen}
            onClose={onCloseModal}
          />
        )
      }
    </Flex>
  );
};
