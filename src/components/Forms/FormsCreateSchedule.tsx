import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { createScheduleFormsSchema } from '../../schemas/schedule.schemas';
import scheduleServices from '../../services/schedule';
import { Schedule } from '@prisma/client';
import { serializeScheduleToForms } from '../../utils/serializeScheduleToForms';
import { Flex, Input, Select, Textarea } from '@chakra-ui/react';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import clientService from '../../services/client';

type CreateScheduleFormsSchema = z.infer<typeof createScheduleFormsSchema>;

type FormsCreateScheduleProps = {
  onFinish: () => void;
  schedule?: Schedule;
};

export const FormsCreateSchedule = ({ onFinish, schedule }: FormsCreateScheduleProps) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<CreateScheduleFormsSchema>({
    resolver: zodResolver(createScheduleFormsSchema),
    values: serializeScheduleToForms(schedule),
  });
  const queryClient = useQueryClient();
  const { data: clients } = useQuery(['clients'], () => clientService.getAll());

  const onSubmit: SubmitHandler<CreateScheduleFormsSchema> = async (data) => {
    try {
      if (schedule) {
        await scheduleServices.update({ ...data, id: schedule.id });
      } else {
        await scheduleServices.create(data);
      }
      queryClient.invalidateQueries(['schedules']);
      onFinish();
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          setError('startDate', { message: 'Você já possui um agendamento para esse horário.' });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column">
        <Input list="clients" {...register('clientName')} placeholder="Cliente" />
        { errors.clientName && <p>{errors.clientName.message}</p> }
        <datalist id="clients">
          {
            clients?.map((client) => (
              <option key={client.id} value={client.name} />
            ))
          }
        </datalist>
        <Input {...register('treatment')} placeholder="Procedimento*" />
        <Input {...register('startDate')} type="datetime-local" />
        { errors.startDate && <p>{errors.startDate.message}</p> }
        <Select {...register('duration')}>
          <option disabled selected hidden>Duração</option>
          <option value="15">15 minutos</option>
          <option value="30">30 minutos</option>
          <option value="45">45 minutos</option>
          <option value="60">1 hora</option>
          <option value="75">1 hora 15 minutos</option>
          <option value="90">1 hora 30 minutos</option>
          <option value="105">1 hora 45 minutos</option>
          <option value="120">2 horas</option>
          <option value="135">2 horas 15 minutos</option>
          <option value="150">2 horas 30 minutos</option>
          <option value="165">2 horas 45 minutos</option>
          <option value="180">3 horas</option>
        </Select>
        { errors.duration && <p>{errors.duration.message}</p> }
        <Textarea {...register('notes')} placeholder="Notas*" />
        <ButtonPrimary type="submit">Agendar</ButtonPrimary>
      </Flex>
    </form>
  );
};
