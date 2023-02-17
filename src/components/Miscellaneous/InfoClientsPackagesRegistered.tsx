import { Flex, Text } from '@chakra-ui/react';
import CountUp from 'react-countup';

type InfoClientsPackagesRegisteredProps = {
  numberOfClients: number;
  numberOfPackages: number;
};

export const InfoClientsPackagesRegistered = ({ numberOfClients, numberOfPackages }: InfoClientsPackagesRegisteredProps) => (
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
        end={numberOfPackages}
        useEasing
      />
      <Text>
        Pacotes cadastrados
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
