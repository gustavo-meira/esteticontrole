import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['GET'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!acceptedMethods.includes(req.method as string)) {
    return res.status(405).json({ message: 'Method not implemented.' });
  }

  if (typeof req.query.id !== 'string') {
    return res.status(400).json({ message: 'id must be a string.' });
  }

  const client = await prisma.client.findFirst({
    where: {
      id: req.query.id,
    },
    include: {
      measures: true,
    },
  });

  res.status(200).json(client);
};

export default handler;
