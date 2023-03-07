import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay } from '@chakra-ui/react';
import { useRef } from 'react';
import { FormsCreateSchedule } from '../Forms/FormsCreateSchedule';

type AlertCreateScheduleProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AlertCreateSchedule = ({ isOpen, onClose }: AlertCreateScheduleProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Área de agendamento </AlertDialogHeader>
        <AlertDialogBody>
          <FormsCreateSchedule onFinish={onClose} />
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );};
