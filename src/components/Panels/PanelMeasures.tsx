import { Box, useDisclosure } from '@chakra-ui/react';
import { Measures } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { api } from '../../lib/api';
import { createMeasuresSchema } from '../../schemas/createMeasuresFormsSchema';
import { changeEditedItemToArray } from '../../utils/changeEditedItemToArray';
import { AlertChoseMeasureToEdit } from '../Alerts/AlertChoseMeasureToEdit';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { ChartClientMeasures } from '../Charts/ChartClientMeasures';
import { FormsCreateMeasures } from '../Forms/FormsCreateMeasures';

type PanelMeasuresProps = {
  measures: Measures[];
  clientId: string;
};

type CreateMeasuresSchema = z.infer<typeof createMeasuresSchema>;

const sortMeasuresByDate = (measuresA: Measures, measuresB: Measures): number => {
  const measureADate = new Date(measuresA.measuredDate);
  const measureBDate = new Date(measuresB.measuredDate);
  return measureADate.getTime() - measureBDate.getTime();
};

export const PanelMeasures = ({ measures, clientId }: PanelMeasuresProps) => {
  const [currMeasures, setCurrMeasures] = useState(measures.sort(sortMeasuresByDate));
  const [measuresToEdit, setMeasuresToEdit] = useState<Measures | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMeasuresToEdit(null);
  }, [currMeasures]);

  const onSubmitNewMeasure = async (measures: CreateMeasuresSchema) => {
    const currentUrl = document.location.origin;
    const dataToSend = { ...measures, clientId };

    if (dataToSend.measuredDate === '') {
      const dataToSendDate = new Date();
      dataToSendDate.setDate(dataToSendDate.getDate() - 1);
      dataToSend.measuredDate = dataToSendDate.toString();
    }

    const measureCreated = await api.post<Measures>(`${currentUrl}/api/measures`, dataToSend);
    setCurrMeasures([...currMeasures, measureCreated.data].sort(sortMeasuresByDate));
  };

  const onMeasuresToEdit = (measuresId: string) => {
    const measuresFounded = currMeasures.find((measure) => measure.id === measuresId);
    if (!measuresFounded) return;
    setMeasuresToEdit(measuresFounded);
  };

  const onEditAMeasure = async (measures: CreateMeasuresSchema) => {
    if (!measuresToEdit) return;

    const currentUrl = document.location.origin;
    const dataToSend = { ...measures, clientId };
    const measuresEdited = await api.put<Measures>(`${currentUrl}/api/measures/${measuresToEdit.id}`, dataToSend);

    setCurrMeasures(changeEditedItemToArray(currMeasures, measuresEdited.data).sort(sortMeasuresByDate));
  };

  const onDeleteAMeasure = async (measuresId: string) => {
    const currentUrl = document.location.origin;
    const measuresFounded = currMeasures.find((measure) => measure.id === measuresId);
    if (!measuresFounded) return;
    await api.delete<Measures>(`${currentUrl}/api/measures/${measuresFounded.id}`);
    setCurrMeasures(currMeasures.filter((measures) => measures.id !== measuresId));
  };

  return (
    <>
      {
        currMeasures.length > 0 && (<ChartClientMeasures measures={currMeasures} />)
      }
      <FormsCreateMeasures
        onEditNewMeasure={onEditAMeasure}
        onSubmitNewMeasure={onSubmitNewMeasure}
        measures={measuresToEdit}
      />
      {
        currMeasures.length > 0 && (
          <>
            <AlertChoseMeasureToEdit
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              measures={currMeasures}
              onMeasuredChosen={onMeasuresToEdit}
              onDeleteMeasureChosen={onDeleteAMeasure}
            />
            {
              !measuresToEdit && (
                <Box
                  position="relative"
                >
                  <ButtonPrimary
                    onClick={onOpen}
                    position="absolute"
                    right="44"
                    bottom="30"
                  >
                Editar/Deletar medidas
                  </ButtonPrimary>
                </Box>
              )
            }
          </>
        )
      }
    </>
  );
};
