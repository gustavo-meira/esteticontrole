import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { FormsCreateSchedule } from '../Forms/FormsCreateSchedule';

type ModalCreateScheduleProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalCreateSchedule = ({ isOpen, onClose }: ModalCreateScheduleProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
  >
    <ModalOverlay />

    <ModalContent>
      <ModalHeader
        textAlign="center"
        p="2"
        color="white"
        backgroundColor="#E0B0FF"
        fontSize="2xl"
        border="1px solid #734A91"
        borderRadius="5px"
      >
          Área de agendamento
      </ModalHeader>
      <ModalBody
        backgroundColor="#F7E7FF"
      >
        <FormsCreateSchedule onFinish={onClose} />
      </ModalBody>
    </ModalContent>
  </Modal>
);
