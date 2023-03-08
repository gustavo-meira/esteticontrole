import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { createScheduleFormsSchema } from '../../schemas/schedule.schemas';
import scheduleServices from '../../services/schedule';

type CreateScheduleFormsSchema = z.infer<typeof createScheduleFormsSchema>;

type FormsCreateScheduleProps = {
  onFinish: () => void;
};

export const FormsCreateSchedule = ({ onFinish }: FormsCreateScheduleProps) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<CreateScheduleFormsSchema>({
    resolver: zodResolver(createScheduleFormsSchema),
  });
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<CreateScheduleFormsSchema> = async (data) => {
    try {
      await scheduleServices.create(data);
      queryClient.invalidateQueries(['schedules']);
      onFinish();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        if (err.response?.status === 409) {
          setError('startDate', { message: 'Você já possui um agendamento para esse horário.' });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('clientName')} placeholder="Cliente" />
      { errors.clientName && <p>{errors.clientName.message}</p> }
      <input {...register('treatment')} placeholder="Procedimento*" />
      <input {...register('startDate')} type="datetime-local" />
      { errors.startDate && <p>{errors.startDate.message}</p> }
      <select {...register('duration')}>
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
      </select>
      { errors.duration && <p>{errors.duration.message}</p> }
      <textarea {...register('notes')} placeholder="Notas*" />
      <button type="submit">Agendar</button>
    </form>
  );
};
