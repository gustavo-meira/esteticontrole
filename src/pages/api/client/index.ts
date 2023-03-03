import { NextApiRequest, NextApiResponse } from 'next';
import { clientToCreateOrUpdateSchema } from '../../../api/schemas/ClientSchemas';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['GET', 'POST'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'GET') {
    const clients = await prisma.client.findMany({});
  
    res.status(200).json(clients);
  }

  if (req.method === 'POST') {
    try {
      const clientToCreate = clientToCreateOrUpdateSchema.parse(req.body);
      const clientCreated = await prisma.client.create({
        data: clientToCreate,
      });
  
      res.status(201).json(clientCreated);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

export default handler;
