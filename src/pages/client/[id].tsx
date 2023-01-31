import { Client, Measures } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { Header } from '../../components/Miscellaneous/Header';
import { api } from '../../lib/api';

type ClientComplete = Client & {
  measures?: Measures;
};

type ClientPageProps = {
  client: ClientComplete | null,
};

const ClientPage = ({ client }: ClientPageProps) => {
  
  if (!client) return <p>Client not found.</p>;
  
  const clientBirthDate = new Date(client.birthDate).toLocaleDateString('pt-BR');

  return (
    <>
      <Header />
      <div>
        <p>{client.name}</p>
        <p>{clientBirthDate}</p>
        <p>{client.description}</p>
      </div>
    </>
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
