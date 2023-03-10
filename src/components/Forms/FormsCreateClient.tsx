import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClientSchema } from '../../schemas/createClientFormsSchema';
import { useRouter } from 'next/router';
import { Client } from '@prisma/client';
import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Textarea } from '@chakra-ui/react';
import { serializeClientToForms } from '../../utils/serializeClientToForms';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import clientService from '../../services/client';

type CreateClientSchema = z.infer<typeof createClientSchema>;

type FormsCreateClientProps = {
  client?: Client;
};

export const FormsCreateClient = ({ client }: FormsCreateClientProps) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateClientSchema>({
    resolver: zodResolver(createClientSchema),
    values: serializeClientToForms(client),
  });

  const onSubmit: SubmitHandler<CreateClientSchema> = async (data) => {
    if (client) {
      const editedClient = await clientService.update({ ...data, id: client.id });
      router.push(`/client/${editedClient.id}`);
    } else {
      const createdClient = await clientService.create(data);
      router.push(`/client/${createdClient.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading
        fontFamily="Poppins"
        textAlign="center"
        fontSize="5xl"
        mt="4"
      >
        { client ? 'Editar' : 'Cadastrar' } Cliente
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
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="date" id="birthDate" {...register('birthDate')}/>
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
              <option value="false">N??o</option>
            </Select>
          </Box>
          <Box width="20%">
            <FormLabel fontSize="lg" htmlFor="smoke">Fuma</FormLabel>
            <Select borderRadius="7px" bgColor="#F1D7FF99" id="smoke" {...register('smoke')}>
              <option value="true">Sim</option>
              <option value="false">N??o</option>
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
            <FormLabel fontSize="lg" htmlFor="feeding">Alimenta????o</FormLabel>
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
            <FormLabel fontSize="lg" htmlFor="drinkWater">??gua</FormLabel>
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
          <Box width="calc(20% - 16px)">
            <FormLabel fontSize="lg" htmlFor="profession">Profiss??o</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="text" id="profession" {...register('profession')}/>
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
            <FormLabel fontSize="lg" htmlFor="illnesses">Doen??as</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="text" id="illnesses" {...register('illnesses')}/>
          </Box>
          <Box width="50%">
            <FormLabel fontSize="lg" htmlFor="medicines">Rem??dios</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="text" id="medicines" {...register('medicines')}/>
          </Box>
        </Flex>
        <Flex
          gap="5"
        >
          <Box width="50%">
            <FormLabel fontSize="lg" htmlFor="illnessesInFamily">Doen??as na fam??lia</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="text" id="illnessesInFamily" {...register('illnessesInFamily')}/>
          </Box>
          <Box width="50%">
            <FormLabel fontSize="lg" htmlFor="mentalHealth">Sa??de mental</FormLabel>
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
            <FormLabel fontSize="lg" htmlFor="indication">Indica????o</FormLabel>
            <Input borderRadius="7px" bgColor="#F1D7FF99" type="text" id="indication" {...register('indication')}/>
          </Box>
        </Flex>
        <Box>
          <FormLabel fontSize="lg" htmlFor="description">Descri????o</FormLabel>
          <Textarea borderRadius="7px" bgColor="#F1D7FF99" id="description" cols={30} rows={10} {...register('description')}></Textarea>
        </Box>
        <Flex
          justifyContent="flex-end"
        >
          <ButtonPrimary
            type="submit"
            mt="2"
          >
            { client ? 'Salvar' : 'Cadastrar' }
          </ButtonPrimary>
        </Flex>
      </FormControl>
    </form>
  );
};

