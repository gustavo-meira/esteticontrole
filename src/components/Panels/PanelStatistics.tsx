import { Flex } from '@chakra-ui/react';
import { StatisticsCounterResponse } from '../../types/statistics.server';
import { ChartClientsServices } from '../Charts/ChartClientsServices';
import { InfoClientsServicesRegistered } from '../Miscellaneous/InfoClientsServicesRegistered';

type PanelStatisticsProps = {
  statistics: StatisticsCounterResponse,
};

export const PanelStatistics = ({ statistics }: PanelStatisticsProps) => (
  <Flex grow="1" justifyContent="space-around">
    <ChartClientsServices />
    <InfoClientsServicesRegistered
      numberOfClients={statistics.numberOfClients}
      numberOfServices={statistics.numberOfServices}
    />
  </Flex>
);
