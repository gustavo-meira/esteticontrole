import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createMeasuresSchema } from '../../schemas/createMeasuresFormsSchema';
import { Box, Flex, FormLabel, Input } from '@chakra-ui/react';
import { Measures } from '@prisma/client';
import { serializeMeasuresToForms } from '../../utils/serializeMeasuresToForms';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { useEffect } from 'react';

type CreateMeasuresSchema = z.infer<typeof createMeasuresSchema>;

type FormsCreateMeasuresProps = {
  measures?: Measures | null;
  onSubmitNewMeasure: (measure: CreateMeasuresSchema) => Promise<void>;
  onEditNewMeasure: (measure: CreateMeasuresSchema) => Promise<void>;
};

export const FormsCreateMeasures = ({ measures, onSubmitNewMeasure, onEditNewMeasure }: FormsCreateMeasuresProps) => {
  const { register, handleSubmit, reset } = useForm<CreateMeasuresSchema>({
    resolver: zodResolver(createMeasuresSchema),
    values: serializeMeasuresToForms(measures),
  });

  const resetForms = () => {
    reset({
      butt: '',
      upperAbdomen: '',
      lowerAbdomen: '',
      height: '',
      leftArm: '',
      leftKnee: '',
      leftThigh: '',
      measuredDate: '',
      rightArm: '',
      rightKnee: '',
      rightThigh: '',
      waist: '',
      weight: '',
    });
  };

  useEffect(() => {
    if (!measures) resetForms();
  }, [measures]);
  
  const onSubmit: SubmitHandler<CreateMeasuresSchema> = (data) => {
    if (measures) {
      onEditNewMeasure(data);
    } else {
      onSubmitNewMeasure(data);
      resetForms();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        p="8"
        pt="4"
        flexDir="column"
        gap="3"
        fontFamily="Poppins"
      >
        <Flex
          gap="5"
        >
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="rightArm">Braço dir.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="rightArm" {...register('rightArm')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="leftArm">Braço esq.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="leftArm" {...register('leftArm')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="chest">Abdomen sup.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="chest" {...register('upperAbdomen')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="hips">Abdomen inf.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="hips" {...register('lowerAbdomen')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="waist">Cintura</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="waist" {...register('waist')}/>
          </Box>
        </Flex>
        <Flex
          gap="5"
        >
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="butt">Bumbum</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="butt" {...register('butt')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="rightThigh">Coxa dir.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="rightThigh" {...register('rightThigh')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="leftThigh">Coxa esq.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="leftThigh" {...register('leftThigh')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="rightCalf">Joelho dir.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="rightCalf" {...register('rightKnee')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="leftCalf">Joelho esq.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="leftCalf" {...register('leftKnee')}/>
          </Box>
        </Flex>
        <Flex
          gap="5"
        >
          <Box width="calc(20% - 16px)">
            <FormLabel fontSize="lg" htmlFor="height">Altura</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="height" {...register('height')}/>
          </Box>
          <Box width="calc(20% - 16px)">
            <FormLabel fontSize="lg" htmlFor="startingWeight">Peso</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="startingWeight" {...register('weight')}/>
          </Box>
          <Box width="calc(20% - 16px)">
            <FormLabel fontSize="lg" htmlFor="height">Data da medição</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="date" step={.01} id="height" {...register('measuredDate')}/>
          </Box>
        </Flex>
        <Flex
          justifyContent="flex-end"
        >
          <ButtonPrimary
            type="submit"
          >
            { measures ? 'Salvar' : 'Cadastrar' }
          </ButtonPrimary>
        </Flex>
      </Flex>
    </form>
  );
};
