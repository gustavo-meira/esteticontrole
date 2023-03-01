import { GetServerSideProps } from 'next';
import { ContainerBasic } from '../components/Containers/ContainerBasic';
import { Header } from '../components/Miscellaneous/Header';
import { PanelStatistics } from '../components/Panels/PanelStatistics';
import statisticsService from '../services/statistics';
import { CounterResponse } from '../types/statistics.server';

type StatisticsPageProps = CounterResponse;

const StatisticsPage = ({ numberOfClients, numberOfServices }: StatisticsPageProps) => (
  <ContainerBasic>
    <Header />
    <PanelStatistics
      statistics={{
        numberOfClients,
        numberOfServices,
      }}
    />
  </ContainerBasic>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const { numberOfClients, numberOfServices } = await statisticsService.counterClientsAndServices();

  return {
    props: {
      numberOfServices,
      numberOfClients,
    },
  };
};

export default StatisticsPage;
