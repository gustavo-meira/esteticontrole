import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from '@chakra-ui/react';
import { Schedule } from '@prisma/client';
import { useRef, useState } from 'react';
import { CardScheduleInfo } from '../Cards/CardScheduleInfo';
import { FormsCreateSchedule } from '../Forms/FormsCreateSchedule';

type AlertEditScheduleProps = {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule;
};

export const AlertEditSchedule = ({ isOpen, onClose, schedule }: AlertEditScheduleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Área de agendamento</AlertDialogHeader>
        <AlertDialogBody>
          {
            isEditing ? (
              <FormsCreateSchedule schedule={schedule} onFinish={onClose} />
            ) : (
              <CardScheduleInfo schedule={schedule} />
            )
          }
        </AlertDialogBody>
        <AlertDialogFooter>
          {
            !isEditing && (
              <button onClick={() => setIsEditing(true)}>Editar</button>
            )
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );};
