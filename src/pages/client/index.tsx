import { Box, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Client } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { MagnifyingGlass, PencilSimpleLine } from 'phosphor-react';
import { useState } from 'react';
import { CardClient } from '../../components/Cards/CardClient';
import { Header } from '../../components/Miscellaneous/Header';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ContainerBasic } from '../../components/Containers/ContainerBasic';
import { ButtonPrimary } from '../../components/Buttons/ButtonPrimary';
import clientService from '../../services/client';

type ClientPageProps = {
  clients: Client[];
};

const ClientPage = ({ clients }: ClientPageProps) => {
  const [clientFilter, setClientFilter] = useState('');
  const [animationParent] = useAutoAnimate();

  const clientsFiltered = clients.filter((client) => (
    client.name.toLowerCase().includes(clientFilter.toLowerCase())
  ));

  const clientsInOrder = clientsFiltered.sort((clientA, clientB) => (
    clientA.name.localeCompare(clientB.name)
  ));

  return (
    <ContainerBasic>
      <Header />
      <Box
        bgColor="#FBFBFB"
        height="full"
      >
        <Flex
          justifyContent="center"
        >
          <InputGroup
            mt="5"
            width="4xl"
          >
            <InputRightElement>
              <MagnifyingGlass />
            </InputRightElement>
            <Input
              placeholder="Nome do cliente"
              onChange={(e) => setClientFilter(e.target.value)}
              value={clientFilter}
              variant="filled"
              bgColor="#F1D7FF99"
            />
          </InputGroup>
        </Flex>
        <Link href="/create-client">
          <ButtonPrimary
            display="flex"
            gap="2"
            position="fixed"
            bottom="16"
            right="16"
            zIndex="1"
          >
            <PencilSimpleLine />
            Cadastrar
          </ButtonPrimary>
        </Link>
        <Flex
          p="30px 60px"
          gap="14"
          flexWrap="wrap"
          ref={animationParent}
          height="100%"
          justifyContent="space-evenly"
        >
          {
            clientsInOrder.map((client) => (
              <CardClient key={client.id} client={client} />
            ))
          }
        </Flex>
      </Box>
    </ContainerBasic>
  );
};

export default ClientPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const clients = await clientService.getAll();

  return {
    props: {
      clients: clients,
    },
  };
};
