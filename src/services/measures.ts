import { Measures } from '@prisma/client';
import { z } from 'zod';
import { api } from '../lib/api';
import { createMeasuresSchema } from '../schemas/createMeasuresFormsSchema';

type MeasuresToCreateBase = z.infer<typeof createMeasuresSchema>;

type MeasuresToCreate = MeasuresToCreateBase & { clientId: Measures['clientId'] };

const create = async (measures: MeasuresToCreate): Promise<Measures> => {
  const { data } = await api.post<Measures>('/api/measures', measures);

  return data;
};

type MeasuresToUpdate = MeasuresToCreate & { id: Measures['id'] };

const update = async (measures: MeasuresToUpdate): Promise<Measures> => {
  const { data } = await api.put<Measures>(`/api/measures/${measures.id}`, measures);

  return data;
};

const deleteOne = async (measuresId: Measures['id']): Promise<Measures> => {
  const { data } = await api.delete<Measures>(`/api/measures/${measuresId}`);

  return data;
};

const measuresService = {
  create,
  update,
  deleteOne,
};

export default measuresService;
