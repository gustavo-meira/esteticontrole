import { z } from 'zod';

export const createMeasuresSchema = z.object({
  measuredDate: z.string(),
  rightArm: z.string().optional(),
  leftArm: z.string().optional(),
  upperAbdomen: z.string().optional(),
  lowerAbdomen: z.string().optional(),
  waist: z.string().optional(),
  butt: z.string().optional(),
  rightThigh: z.string().optional(),
  leftThigh: z.string().optional(),
  rightKnee: z.string().optional(),
  leftKnee: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
});
