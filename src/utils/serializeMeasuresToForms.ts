import { createMeasuresSchema } from '../schemas/createMeasuresFormsSchema';
import { z } from 'zod';
import { Measures } from '@prisma/client';

type CreateMeasuresSchema = z.infer<typeof createMeasuresSchema>;

export const serializeMeasuresToForms = (measures?: Measures | null): CreateMeasuresSchema | undefined => {
  if (!measures) return;

  const measuredDate = new Date(measures.measuredDate);
  measuredDate.setHours(0);

  return {
    measuredDate: measuredDate.toISOString().slice(0, 10),
    rightArm: measures.rightArm?.toString(),
    leftArm: measures.leftArm?.toString(),
    chest: measures.chest?.toString(),
    waist: measures.chest?.toString(),
    hips: measures.hips?.toString(),
    butt: measures.butt?.toString(),
    rightThigh: measures.rightThigh?.toString(),
    leftThigh: measures.leftThigh?.toString(),
    rightCalf: measures.rightCalf?.toString(),
    leftCalf: measures.leftCalf?.toString(),
    height: measures.height?.toString(),
    weight: measures.weight?.toString(),
  };
};
