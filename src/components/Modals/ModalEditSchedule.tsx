import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { Schedule } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import scheduleServices from '../../services/schedule';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';
import { CardScheduleInfo } from '../Cards/CardScheduleInfo';
import { FormsCreateSchedule } from '../Forms/FormsCreateSchedule';

type ModalEditScheduleProps = {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule;
};

export const ModalEditSchedule = ({ isOpen, onClose, schedule }: ModalEditScheduleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const onDeleteSchedule = async () => {
    await scheduleServices.deleteOne(schedule.id);
    queryClient.invalidateQueries(['schedules']);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />

      <ModalContent
        backgroundColor="#F7E7FF"
        border="1px solid #734A91"
        borderRadius="5px"
        overflow="hidden"
      >
        <ModalHeader
          textAlign="center"
          p="2"
          color="white"
          backgroundColor="#E0B0FF"
          fontSize="2xl"
          borderBottom="1px solid #734A91"
          borderRadius="5px"
        >
          Área de agendamento
        </ModalHeader>
        <ModalBody>
          {
            isEditing ? (
              <FormsCreateSchedule schedule={schedule} onFinish={onClose} />
            ) : (
              <CardScheduleInfo schedule={schedule} />
            )
          }
        </ModalBody>
        {
          !isEditing && (
            <ModalFooter
              backgroundColor="#F7E7FF"
            >
              <ButtonSecondary mr="2" onClick={onDeleteSchedule}>Excluir</ButtonSecondary>
              <ButtonPrimary onClick={() => setIsEditing(true)}>Editar</ButtonPrimary>
            </ModalFooter>
          )
        }
      </ModalContent>
    </Modal>
  );};
