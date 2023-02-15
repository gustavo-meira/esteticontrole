import { Flex, Text } from '@chakra-ui/react';
import CountUp from 'react-countup';

type InfoClientsPackagesRegisteredProps = {
  numberOfClients: number;
  numberOfPackages: number;
};

export const InfoClientsPackagesRegistered = ({ numberOfClients, numberOfPackages }: InfoClientsPackagesRegisteredProps) => (
  <>
    <Flex flexDir="column">
      <CountUp
        duration={4}
        end={numberOfClients}
        useEasing
      />
      <Text>
        Clientes cadastrados
      </Text>
    </Flex>
    <Flex flexDir="column">
      <CountUp
        duration={4}
        end={numberOfPackages}
        useEasing
      />
      <Text>
        Pacotes cadastrados
      </Text>
    </Flex>
  </>
);
