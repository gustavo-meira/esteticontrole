import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogProps, Select } from '@chakra-ui/react';
import { Measures } from '@prisma/client';
import { useEffect, useState } from 'react';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';

type AlertChoseMeasureToEditProps = Omit<AlertDialogProps, 'children'> & {
  measures: Measures[];
  onMeasuredChosen: (measuresId: string) => void;
  onDeleteMeasureChosen: (measuresId: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

export const AlertChoseMeasureToEdit = ({ isOpen, onClose, leastDestructiveRef, measures, onMeasuredChosen, onDeleteMeasureChosen }: AlertChoseMeasureToEditProps) => {
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
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg">
            Deseja alterar as medidas de qual data ?
          </AlertDialogHeader>

          <AlertDialogBody>
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
          </AlertDialogBody>

          <AlertDialogFooter>
            <ButtonSecondary onClick={onClose} >
              Cancelar
            </ButtonSecondary>
            <ButtonSecondary onClick={onClickToDelete} ml="3" >
              Deletar
            </ButtonSecondary>
            <ButtonPrimary onClick={onClickToChose} ml="3" >
              Escolher
            </ButtonPrimary>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
