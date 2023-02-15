import { GetServerSideProps } from 'next';
import { ContainerBasic } from '../components/Containers/ContainerBasic';
import { Header } from '../components/Miscellaneous/Header';
import { PanelStatistics } from '../components/Panels/PanelStatistics';
import { api } from '../lib/api';
import { StatisticsCounterResponse } from '../types/statistics.server';

type StatisticsPageProps = StatisticsCounterResponse;

const StatisticsPage = ({ numberOfClients, numberOfPackages }: StatisticsPageProps) => (
  <ContainerBasic>
    <Header />
    <PanelStatistics
      statistics={{
        numberOfClients,
        numberOfPackages,
      }}
    />
  </ContainerBasic>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const host = process.env.HOST;

  const { data } = await api.get<StatisticsCounterResponse>(`${host}/api/statistics/counter`);

  return {
    props: {
      numberOfPackages: data.numberOfPackages,
      numberOfClients: data.numberOfClients,
    },
  };
};

export default StatisticsPage;
