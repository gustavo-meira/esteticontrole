import { Schedule } from '@prisma/client';

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

export const ListSchedulesOfADay = ({ schedules, date }: ListSchedulesOfADayProps) => (
  <div>
    <h2>{daysOfWeek[date.getDay()]} | {date.toLocaleDateString('pt-BR')}</h2>
    {
      schedules.map((schedule) => (
        <div key={schedule.id}>
          <h3>{schedule.clientName}</h3>
          <p>{new Date(schedule.startDate).toLocaleDateString('pt-BR')}</p>
        </div>
      ))
    }
  </div>
);
