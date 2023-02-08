import { Client } from '@prisma/client';

type PanelClientProps = {
  client: Client;
};

export const PanelClient = ({ client }: PanelClientProps) => (
  <h2>{client.name}</h2>
);
