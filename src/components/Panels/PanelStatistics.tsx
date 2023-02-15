import { StatisticsCounterResponse } from '../../types/statistics.server';
import { InfoClientsPackagesRegistered } from '../Miscellaneous/InfoClientsPackagesRegistered';

type PanelStatisticsProps = {
  statistics: StatisticsCounterResponse,
};

export const PanelStatistics = ({ statistics }: PanelStatisticsProps) => (
  <div>
    <InfoClientsPackagesRegistered
      numberOfClients={statistics.numberOfClients}
      numberOfPackages={statistics.numberOfPackages}
    />
  </div>
);
