import { Client } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { CardClient } from '../../components/Cards/CardClient';
import { api } from '../../lib/api';

type ClientPageProps = {
  clients: Client[];
};

const ClientPage = ({ clients }: ClientPageProps) => (
  <div>
    {
      clients.map((client) => (
        <CardClient key={client.id} client={client} />
      ))
    }
  </div>
);

export default ClientPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const host = process.env.HOST;
  const clients = await api.get<Client[]>(`${host}/api/client`);

  return {
    props: {
      clients: clients.data,
    },
  };
};