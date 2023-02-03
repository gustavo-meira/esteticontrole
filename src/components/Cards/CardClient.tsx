import { Flex, Text } from '@chakra-ui/react';
import { Client } from '@prisma/client';
import Link from 'next/link';
import { capitalizeEveryStartLetter } from '../../utils/capitalizeEveryStartLetter';

type CardClientProps = {
  client: Client;
};

export const CardClient = ({ client }: CardClientProps) => {
  const clientBirthDate = new Date(client.birthDate);
  const clientDescription = Boolean(client.description) ? client.description : 'Nenhuma descrição.';

  return (
    <Link href={`/client/${client.id}`}>
      <Flex
        flexDir="column"
        p="8px 16px"
        bgColor="#F1D7FF94"
        width="400px"
        height="250px"
        fontFamily="Poppins"
        color="#734A91"
      >
        <Text
          fontSize="3xl"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {capitalizeEveryStartLetter(client.name)}
        </Text>
        <Text
          fontSize="large"
          opacity=".6"
        >
          {clientBirthDate.toLocaleDateString('pt-BR')}
        </Text>
        <Text
          fontSize="large"
          opacity=".6"
          overflow="hidden"
        >
          {clientDescription}
        </Text>
      </Flex>
    </Link>
  );
};
