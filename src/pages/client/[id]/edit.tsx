import { GetServerSideProps } from 'next';
import { ContainerBasic } from '../../../components/Containers/ContainerBasic';
import { FormsCreateClient } from '../../../components/Forms/FormsCreateClient';
import { Header } from '../../../components/Miscellaneous/Header';
import { Client } from '@prisma/client';
import clientService from '../../../services/client';

type ClientEditPageProps = {
  client: Client;
};

const ClientEditPage = ({ client }: ClientEditPageProps) => (
  <ContainerBasic>
    <Header />
    <FormsCreateClient client={client} />
  </ContainerBasic>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id;

  if (typeof id !== 'string' || !id) {
    return {
      props: {
        client: null,
      },
    };
  }

  const client = await clientService.getOne(id);

  return {
    props: {
      client,
    },
  };
};

export default ClientEditPage;
