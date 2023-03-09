import { Flex, Input, Text, useDisclosure } from '@chakra-ui/react';
import { Schedule } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import scheduleServices from '../../services/schedule';
import { ModalCreateSchedule } from '../Modals/ModalCreateSchedule';
import { ButtonForwardBackward } from '../Buttons/ButtonForwardBackward';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { ListSchedulesOfADay } from '../Lists/ListSchedulesOfADay';
import { PencilSimpleLine } from 'phosphor-react';

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const PanelSchedules = () => {
  const [currWeek, setCurrWeek] = useState(new Date().toISOString().slice(0, 10));
  const { data: schedules, refetch } = useQuery<Schedule[]>(['schedules'],
    () => scheduleServices.getAWeek(currWeek),
    { refetchOnWindowFocus: false }
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputDateRef = useRef<HTMLInputElement>(null);

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

  const onClickTextDate = () => {
    if (inputDateRef.current) inputDateRef.current.showPicker();
  };

  return (
    <Flex flexDirection="column" flexGrow="1">
      <Flex
        m="4"
        ml="12"
      >
        <Text
          fontSize="3xl"
          color="#A87BC7"
          onClick={onClickTextDate}
          cursor="pointer"
        >
          {months[firstDate.getMonth()]} de {firstDate.getFullYear()}
        </Text>
        <Input
          hidden
          type="date"
          value={currWeek}
          onChange={(e) => {
            const [year] = e.target.value.split('-');
            if (Number(year) > 2000) setCurrWeek(e.target.value);
          }}
          width="44"
          borderRadius="7px"
          bgColor="#F1D7FF99"
          ref={inputDateRef}
          _focus={{ display: 'block' }}
        />
      </Flex>
      <Flex justifyContent="space-between" flexGrow="1">
        <ButtonForwardBackward
          direction="backward"
          onClick={() => moveDateBackwardsOrForwards('backward')}
          alignSelf="center"
        />
        <Flex flexGrow="1" gap="4">
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
        </Flex>
        <ButtonForwardBackward
          direction="forward"
          onClick={() => moveDateBackwardsOrForwards('forward')}
          alignSelf="center"
        />
      </Flex>
      <Flex justifyContent="flex-end">
        <ButtonPrimary
          onClick={onOpen}
          margin="8"
          display="flex"
          gap="2"
          zIndex="1"
        >
          <PencilSimpleLine />
          Agendar
        </ButtonPrimary>
        <ModalCreateSchedule
          isOpen={isOpen}
          onClose={onClose}
        />
      </Flex>
    </Flex>
  );
};
