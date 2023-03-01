import { Flex } from '@chakra-ui/react';
import { CounterResponse } from '../../types/statistics.server';
import { ChartClientsByAge } from '../Charts/ChartClientsByAge';
import { ChartClientsServices } from '../Charts/ChartClientsServices';
import { InfoClientsServicesRegistered } from '../Miscellaneous/InfoClientsServicesRegistered';

type PanelStatisticsProps = {
  statistics: CounterResponse,
};

export const PanelStatistics = ({ statistics }: PanelStatisticsProps) => (
  <Flex grow="1" justifyContent="space-around">
    <Flex flexDir="column" alignItems="center">
      <ChartClientsServices />
      <ChartClientsByAge />
    </Flex>
    <InfoClientsServicesRegistered
      numberOfClients={statistics.numberOfClients}
      numberOfServices={statistics.numberOfServices}
    />
  </Flex>
);
