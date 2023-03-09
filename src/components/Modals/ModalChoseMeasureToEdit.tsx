import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalProps, Select } from '@chakra-ui/react';
import { Measures } from '@prisma/client';
import { useEffect, useState } from 'react';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';

type ModalChoseMeasureToEditProps = Omit<ModalProps, 'children'> & {
  measures: Measures[];
  onMeasuredChosen: (measuresId: string) => void;
  onDeleteMeasureChosen: (measuresId: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

export const ModalChoseMeasureToEdit = ({ isOpen, onClose, measures, onMeasuredChosen, onDeleteMeasureChosen }: ModalChoseMeasureToEditProps) => {
  const [measuresIdChosen, setMeasuresIdChosen] = useState(measures[0].id);

  useEffect(() => {
    setMeasuresIdChosen(measures[0].id);
  }, [measures]);

  const onClickToChose = () => {
    onMeasuredChosen(measuresIdChosen);
    onClose();
  };

  const onClickToDelete = () => {
    onDeleteMeasureChosen(measuresIdChosen);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader fontSize="lg">
            Deseja alterar as medidas de qual data ?
          </ModalHeader>

          <ModalBody>
            <Select
              borderRadius="7px"
              bgColor="#F1D7FF99"
              onChange={(e) => setMeasuresIdChosen(e.target.value)}
              value={measuresIdChosen}
            >
              {
                measures.map((measure) => (
                  <option key={measure.id} value={measure.id}>
                    {new Date(measure.measuredDate).toLocaleDateString('pt-BR')}
                  </option>
                ))
              }
            </Select>
          </ModalBody>

          <ModalFooter>
            <ButtonSecondary onClick={onClose} >
              Cancelar
            </ButtonSecondary>
            <ButtonSecondary onClick={onClickToDelete} ml="3" >
              Deletar
            </ButtonSecondary>
            <ButtonPrimary onClick={onClickToChose} ml="3" >
              Escolher
            </ButtonPrimary>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
