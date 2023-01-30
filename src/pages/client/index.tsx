import { Client } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { CardClient } from '../../components/Cards/CardClient';
import { Header } from '../../components/Miscellaneous/Header';
import { api } from '../../lib/api';

type ClientPageProps = {
  clients: Client[];
};

const ClientPage = ({ clients }: ClientPageProps) => {
  const [clientFilter, setClientFilter] = useState('');

  const clientsFiltered = clients.filter((client) => (
    client.name.toLowerCase().includes(clientFilter.toLowerCase())
  ));

  const clientsInOrder = clientsFiltered.sort((clientA, clientB) => (
    clientA.name.localeCompare(clientB.name)
  ));

  return (
    <>
      <Header />
      <input
        placeholder="Nome do cliente"
        onChange={(e) => setClientFilter(e.target.value)}
        value={clientFilter}
      />
      <Link href="/create-client">
        <button type="button">Cadastrar</button>
      </Link>
      <div>
        {
          clientsInOrder.map((client) => (
            <CardClient key={client.id} client={client} />
          ))
        }
      </div>
    </>
  );
};

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
