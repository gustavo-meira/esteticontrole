import { z } from 'zod';

export const createMeasuresSchema = z.object({
  measuredDate: z.string(),
  rightArm: z.string().optional(),
  leftArm: z.string().optional(),
  chest: z.string().optional(),
  waist: z.string().optional(),
  hips: z.string().optional(),
  butt: z.string().optional(),
  rightThigh: z.string().optional(),
  leftThigh: z.string().optional(),
  rightCalf: z.string().optional(),
  leftCalf: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
});
