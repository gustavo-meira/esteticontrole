import { GetServerSideProps } from 'next';
import { ContainerBasic } from '../../components/Containers/ContainerBasic';
import { Header } from '../../components/Miscellaneous/Header';
import { TabClient } from '../../components/Tabs/TabClient';
import clientService from '../../services/client';
import { ClientWithOptionalProps } from '../../types/client.server';

type ClientPageProps = {
  client: ClientWithOptionalProps<{
    measures: true,
    services: true,
  }> | null,
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
  const id = ctx.query.id;

  if (typeof id !== 'string' || !id) {
    return {
      props: {
        client: null,
      },
    };
  }

  const client = await clientService.getOne(id, { measures: true, services: true });

  return {
    props: {
      client,
    },
  };
};

export default ClientPage;
