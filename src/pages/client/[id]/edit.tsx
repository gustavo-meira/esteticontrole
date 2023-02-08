import { Client, Measures } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { ContainerBasic } from '../../../components/Containers/ContainerBasic';
import { FormsCreateClient } from '../../../components/Forms/FormsCreateClient';
import { Header } from '../../../components/Miscellaneous/Header';
import { api } from '../../../lib/api';

type ClientEditPageProps = {
  client: Client & { measures: Measures };
};

const ClientEditPage = ({ client }: ClientEditPageProps) => (
  <ContainerBasic>
    <Header />
    <FormsCreateClient client={client} />
  </ContainerBasic>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id as string;
  const host = process.env.HOST as string;

  const client = await api.get<Client & { measures: Measures }>(`${host}/api/client/${id}`);

  return {
    props: {
      client: client.data,
    },
  };
};

export default ClientEditPage;
