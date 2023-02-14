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
    upperAbdomen: measures.upperAbdomen?.toString(),
    lowerAbdomen: measures.lowerAbdomen?.toString(),
    waist: measures.waist?.toString(),
    butt: measures.butt?.toString(),
    rightThigh: measures.rightThigh?.toString(),
    leftThigh: measures.leftThigh?.toString(),
    rightKnee: measures.rightKnee?.toString(),
    leftKnee: measures.leftKnee?.toString(),
    height: measures.height?.toString(),
    weight: measures.weight?.toString(),
  };
};
