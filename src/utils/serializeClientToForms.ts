import { Client, Measures } from '@prisma/client';
import { z } from 'zod';
import { createClientSchema } from '../schemas/createClientFormsSchema';

type CreateClientSchema = z.infer<typeof createClientSchema>;

export const serializeClientToForms = (client?: Client & { measures: Measures }): CreateClientSchema | undefined => {
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
    startingWeight: client.startingWeight?.toString(),
    surgeries: client.surgeries ? client.surgeries : undefined,
    illnesses: client.illnesses ? client.illnesses : undefined,
    medicines: client.medicines ? client.medicines : undefined,
    illnessesInFamily: client.illnessesInFamily ? client.illnessesInFamily : undefined,
    mentalHealth: client.mentalHealth ? client.mentalHealth : undefined,
    otherTreatments: client.otherTreatments ? client.otherTreatments : undefined,
    indication: client.indication ? client.indication : undefined,
    description: client.description ? client.description : undefined,
    measures: {
      butt: client.measures.butt?.toString(),
      chest: client.measures.chest?.toString(),
      height: client.measures.height?.toString(),
      hips: client.measures.hips?.toString(),
      leftArm: client.measures.leftArm?.toString(),
      rightArm: client.measures.rightArm?.toString(),
      leftCalf: client.measures.leftCalf?.toString(),
      rightCalf: client.measures.rightCalf?.toString(),
      leftThigh: client.measures.leftThigh?.toString(),
      rightThigh: client.measures.rightThigh?.toString(),
    },
  };
};
