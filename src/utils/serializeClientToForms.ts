import { Client } from '@prisma/client';
import { z } from 'zod';
import { createClientSchema } from '../schemas/createClientFormsSchema';

type CreateClientSchema = z.infer<typeof createClientSchema>;

export const serializeClientToForms = (client?: Client): CreateClientSchema | undefined => {
  if (!client) return;

  const clientDate = new Date(client.birthDate);
  clientDate.setHours(0);

  return {
    ...client,
    birthDate: clientDate.toISOString().slice(0, 10),
    drink: client.drink ? 'true' : 'false',
    smoke: client.smoke ? 'true' : 'false',
    children: client.children?.toString(),
    drinkWater: client.drinkWater.toString(),
    surgeries: client?.surgeries ? client.surgeries : undefined,
    illnesses: client.illnesses ? client.illnesses : undefined,
    medicines: client.medicines ? client.medicines : undefined,
    illnessesInFamily: client.illnessesInFamily ? client.illnessesInFamily : undefined,
    mentalHealth: client.mentalHealth ? client.mentalHealth : undefined,
    otherTreatments: client.otherTreatments ? client.otherTreatments : undefined,
    indication: client.indication ? client.indication : undefined,
    description: client.description ? client.description : undefined,
    profession: client.profession ? client.profession : undefined,
  };
};
