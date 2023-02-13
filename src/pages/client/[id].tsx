import { Client, Measures, Package } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { ContainerBasic } from '../../components/Containers/ContainerBasic';
import { Header } from '../../components/Miscellaneous/Header';
import { TabClient } from '../../components/Tabs/TabClient';
import { api } from '../../lib/api';

type ClientComplete = Client & {
  measures: Measures[];
  packages: Package[];
};

type ClientPageProps = {
  client: ClientComplete | null,
};

const ClientPage = ({ client }: ClientPageProps) => {

  if (!client) return <p>Client not found.</p>;

  return (
    <ContainerBasic>
      <Header />
      <TabClient client={client} />
    </ContainerBasic>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const host = process.env.HOST as string;
  try {
    const client = await api.get<ClientComplete>(`${host}/api/client/${ctx.query.id}`);
  
    return {
      props: {
        client: client.data,
      },
      
    };
  } catch {
    return {
      props: {
        client: null,
      },
    };
  }
};

export default ClientPage;
