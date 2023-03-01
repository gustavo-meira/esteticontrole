import { z } from 'zod';
import { Client } from '@prisma/client';
import { createClientSchema } from '../schemas/createClientFormsSchema';
import { api } from '../lib/api';
import { clientOptionalProps, ClientWithOptionalProps } from '../types/client.server';

type ClientToCreate = z.infer<typeof createClientSchema>;

const create = async (client: ClientToCreate): Promise<Client> => {
  try {
    const { data } = await api.post<Client>('/api/client', client);
    return data;
  } catch (err) {
    throw err;
  }
};

const deleteOne = async (id: string): Promise<Client> => {
  try {
    const { data } = await api.delete<Client>(`/api/client/${id}`);
    return data;
  } catch (err) {
    throw err;
  }
};

type ClientToUpdate = ClientToCreate & { id: Client['id'] };

const update = async (client: ClientToUpdate): Promise<Client> => {
  try {
    const { data } = await api.put<Client>(`/api/client/${client.id}`, client);
    return data;
  } catch (err) {
    throw err;
  }
};

const getAll = async (): Promise<Client[]> => {
  try {
    const { data } = await api.get<Client[]>('/api/client');
    return data;
  } catch (err) {
    throw err;
  }
};

const getOne = async <T extends clientOptionalProps>(id: string, options?: T): Promise<ClientWithOptionalProps<T> | null> => {
  try {
    const { data } = await api.get<ClientWithOptionalProps<T>>(`/api/client/${id}`, {
      params: options,
    });

    return data;
  } catch {
    return null;
  }
};

const clientService = {
  create,
  deleteOne,
  update,
  getAll,
  getOne,
};

export default clientService;
