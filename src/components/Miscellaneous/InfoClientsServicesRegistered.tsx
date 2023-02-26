import { Flex, Text } from '@chakra-ui/react';
import CountUp from 'react-countup';

type InfoClientsServicesRegisteredProps = {
  numberOfClients: number;
  numberOfServices: number;
};

export const InfoClientsServicesRegistered = ({ numberOfClients, numberOfServices }: InfoClientsServicesRegisteredProps) => (
  <Flex
    mt="12"
    justifyContent="space-evenly"
    alignItems="center"
    flexDir="column"
    minW="400px"
    maxH="500px"
  >
    <Flex 
      gap="2"
      flexDir="column"
      textAlign="center"
      border="2px solid #635C66"
      borderRadius="md"
      padding="4"
      maxW="40"
    >
      <CountUp
        duration={4}
        end={numberOfServices}
        useEasing
      />
      <Text>
        Atendimentos cadastrados
      </Text>
    </Flex>
    <Flex 
      gap="2"
      flexDir="column"
      textAlign="center"
      border="2px solid #635C66"
      borderRadius="md"
      padding="4"
      maxW="40"
    >
      <Text
        fontSize="xl"
      >
        <CountUp
          duration={4}
          end={numberOfClients}
          useEasing
        />
      </Text>
      <Text>
        Clientes cadastrados
      </Text>
    </Flex>
  </Flex>
);
