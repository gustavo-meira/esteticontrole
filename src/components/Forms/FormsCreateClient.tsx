import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClientSchema } from '../../schemas/createClientFormsSchema';
import { useRouter } from 'next/router';
import { api } from '../../lib/api';
import { Client, Measures } from '@prisma/client';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Textarea } from '@chakra-ui/react';

type CreateClientSchema = z.infer<typeof createClientSchema>;

export const FormsCreateClient = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateClientSchema>({
    resolver: zodResolver(createClientSchema),
  });

  const onSubmit: SubmitHandler<CreateClientSchema> = async (data) => {
    const currentUrl = document.location.origin;
    const receivedData = await api.post<Client & { measures: Measures }>(`${currentUrl}/api/client`, data);
    router.push(`/client/${receivedData.data.id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading
        fontFamily="Poppins"
        textAlign="center"
        fontSize="5xl"
        mt="4"
      >
        Cadastrar Cliente
      </Heading>
      <FormControl
        p="8"
        pt="4"
        display="flex"
        flexDir="column"
        gap="3"
        fontFamily="Poppins"
      >
        <Flex
          gap="5"
        >
          <Box width="70%">
            <FormLabel fontSize="lg" htmlFor="name">Nome*</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="text" id="name" {...register('name')}/>
            { errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage> }
          </Box>
          <Box width="30%">
            <FormLabel fontSize="lg" htmlFor="birthDate">Data de nasc.*</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="date" id="birthDate" {...register('birthDate', { valueAsDate: true })}/>
            { errors.birthDate && <FormErrorMessage>{errors.birthDate.message}</FormErrorMessage> }
          </Box>
        </Flex>
        <Flex
          gap="5"
        >
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="children">Filhos</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" id="children" {...register('children')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="drink">Bebe</FormLabel>
            <Select borderRadius="7px" bgColor="#F1D7FF99" id="drink" {...register('drink')}>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </Select>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="smoke">Fuma</FormLabel>
            <Select borderRadius="7px" bgColor="#F1D7FF99" id="smoke" {...register('smoke')}>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </Select>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="sleep">Sono</FormLabel>
            <Select borderRadius="7px" bgColor="#F1D7FF99" id="sleep" {...register('sleep')}>
              <option value="Bom">Bom</option>
              <option value="Regular">Regular</option>
              <option value="Ruim">Ruim</option>
            </Select>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="feeding">Alimentação</FormLabel>
            <Select borderRadius="7px" bgColor="#F1D7FF99" id="feeding" {...register('feeding')}>
              <option value="Bom">Bom</option>
              <option value="Regular">Regular</option>
              <option value="Ruim">Ruim</option>
            </Select>
          </Box>
        </Flex>
        <Flex
          gap="5"
        >
          <Box width="calc(20% - 16px)">
            <FormLabel fontSize="lg" htmlFor="drinkWater">Água</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="drinkWater" {...register('drinkWater')}/>
          </Box>
          <Box width="calc(20% - 16px)">
            <FormLabel fontSize="lg" htmlFor="intestine">Intestino</FormLabel>
            <Select borderRadius="7px" bgColor="#F1D7FF99" id="intestine" {...register('intestine')}>
              <option value="Bom">Bom</option>
              <option value="Regular">Regular</option>
              <option value="Ruim">Ruim</option>
            </Select>
          </Box>
          <Box flexGrow="1">
            <FormLabel fontSize="lg" htmlFor="surgeries">Cirurgias</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="text" id="surgeries" {...register('surgeries')}/>
          </Box>
        </Flex>
        <Flex
          gap="5"
        >
          <Box width="50%">
            <FormLabel fontSize="lg" htmlFor="illnesses">Doenças</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="text" id="illnesses" {...register('illnesses')}/>
          </Box>
          <Box width="50%">
            <FormLabel fontSize="lg" htmlFor="medicines">Remédios</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="text" id="medicines" {...register('medicines')}/>
          </Box>
        </Flex>
        <Flex
          gap="5"
        >
          <Box width="50%">
            <FormLabel fontSize="lg" htmlFor="illnessesInFamily">Doenças na família</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="text" id="illnessesInFamily" {...register('illnessesInFamily')}/>
          </Box>
          <Box width="50%">
            <FormLabel fontSize="lg" htmlFor="mentalHealth">Saúde mental</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="text" id="mentalHealth" {...register('mentalHealth')}/>
          </Box>
        </Flex>
        <Flex
          gap="5"
        >
          <Box width="50%">
            <FormLabel fontSize="lg" htmlFor="otherTreatments">Outros tratamentos</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="text" id="otherTreatments" {...register('otherTreatments')}/>
          </Box>
          <Box width="50%">
            <FormLabel fontSize="lg" htmlFor="indication">Indicação</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="text" id="indication" {...register('indication')}/>
          </Box>
        </Flex>
        <Flex
          gap="5"
        >
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="rightArm">Braço dir.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="rightArm" {...register('measures.rightArm')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="leftArm">Braço esq.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="leftArm" {...register('measures.leftArm')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="chest">Peito</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="chest" {...register('measures.chest')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="waist">Cintura</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="waist" {...register('measures.waist')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="hips">Ancas</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="hips" {...register('measures.hips')}/>
          </Box>
        </Flex>
        <Flex
          gap="5"
        >
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="butt">Bumbum</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="butt" {...register('measures.butt')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="rightThigh">Coxa dir.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="rightThigh" {...register('measures.rightThigh')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="leftThigh">Coxa esq.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="leftThigh" {...register('measures.leftThigh')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="rightCalf">Batata dir.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="rightCalf" {...register('measures.rightCalf')}/>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="leftCalf">Batata esq.</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="leftCalf" {...register('measures.leftCalf')}/>
          </Box>
        </Flex>
        <Flex
          gap="5"
        >
          <Box width="calc(20% - 16px)">
            <FormLabel fontSize="lg" htmlFor="height">Altura</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="height" {...register('measures.height')}/>
          </Box>
          <Box width="calc(20% - 16px)">
            <FormLabel fontSize="lg" htmlFor="startingWeight">Peso Inicial</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="number" step={.01} id="startingWeight" {...register('startingWeight')}/>
          </Box>
        </Flex>
        <Box>
          <FormLabel fontSize="lg" htmlFor="description">Descrição</FormLabel>
          <Textarea borderRadius="7px" bgColor="#F1D7FF99" id="description" cols={30} rows={10} {...register('description')}></Textarea>
        </Box>
        <Flex
          justifyContent="flex-end"
        >
          <Button
            type="submit"
            bgColor="#A87BC7"
            color="white"
            fontFamily="Poppins"
            fontWeight="normal"
            mt="2"
            colorScheme="purple"
          >
            Cadastrar
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
};

