import { Client } from '@prisma/client';
import Link from 'next/link';

type CardClientProps = {
  client: Client;
};

export const CardClient = ({ client }: CardClientProps) => {
  const clientBirthDate = new Date(client.birthDate);

  return (
    <Link href={`/client/${client.id}`}>
      <div>
        <h3>{client.name}</h3>
        <p>{clientBirthDate.toLocaleDateString()}</p>
        <p>{client.description}</p>
      </div>
    </Link>
  );
};