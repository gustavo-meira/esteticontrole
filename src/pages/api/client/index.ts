import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['GET'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(505).json({ message: 'Method not implemented.' });
  }

  const clients = await prisma.client.findMany({});

  res.status(200).json({ clients });
};

export default handler;
