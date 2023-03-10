import { Box, useDisclosure } from '@chakra-ui/react';
import { Measures } from '@prisma/client';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { createMeasuresSchema } from '../../schemas/createMeasuresFormsSchema';
import measuresService from '../../services/measures';
import { changeEditedItemToArray } from '../../utils/changeEditedItemToArray';
import { ModalChoseMeasureToEdit } from '../Modals/ModalChoseMeasureToEdit';
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

  useEffect(() => {
    setMeasuresToEdit(null);
  }, [currMeasures]);

  const onSubmitNewMeasure = async (measures: CreateMeasuresSchema) => {
    const dataToSend = { ...measures, clientId };

    if (dataToSend.measuredDate === '') {
      const dataToSendDate = new Date();
      dataToSendDate.setDate(dataToSendDate.getDate() - 1);
      dataToSend.measuredDate = dataToSendDate.toString();
    }

    const measuresCreated = await measuresService.create(dataToSend);
    setCurrMeasures([...currMeasures, measuresCreated].sort(sortMeasuresByDate));
  };

  const onMeasuresToEdit = (measuresId: string) => {
    const measuresFounded = currMeasures.find((measure) => measure.id === measuresId);
    if (!measuresFounded) return;
    setMeasuresToEdit(measuresFounded);
  };

  const onEditAMeasure = async (measures: CreateMeasuresSchema) => {
    if (!measuresToEdit) return;

    const dataToSend = { ...measures, clientId, id: measuresToEdit.id };
    const measuresEdited = await measuresService.update(dataToSend);

    setCurrMeasures(changeEditedItemToArray(currMeasures, measuresEdited).sort(sortMeasuresByDate));
  };

  const onDeleteAMeasure = async (measuresId: string) => {
    const measuresFounded = currMeasures.find((measure) => measure.id === measuresId);
    if (!measuresFounded) return;

    await measuresService.deleteOne(measuresId);

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
            <ModalChoseMeasureToEdit
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
