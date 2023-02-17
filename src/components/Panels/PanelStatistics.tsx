import { Flex } from '@chakra-ui/react';
import { StatisticsCounterResponse } from '../../types/statistics.server';
import { ChartClientsPackages } from '../Charts/ChartClientsPackages';
import { InfoClientsPackagesRegistered } from '../Miscellaneous/InfoClientsPackagesRegistered';

type PanelStatisticsProps = {
  statistics: StatisticsCounterResponse,
};

export const PanelStatistics = ({ statistics }: PanelStatisticsProps) => (
  <Flex grow="1" justifyContent="space-around">
    <ChartClientsPackages />
    <InfoClientsPackagesRegistered
      numberOfClients={statistics.numberOfClients}
      numberOfPackages={statistics.numberOfPackages}
    />
  </Flex>
);
