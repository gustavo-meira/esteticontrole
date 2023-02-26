import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { StatisticsCounterResponse } from '../../../types/statistics.server';

const acceptedMethods = ['GET'];

const handler = async (req: NextApiRequest, res: NextApiResponse<StatisticsCounterResponse | { message: string }>) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'GET') {
    const [numberOfServices, numberOfClients] = await Promise.all([
      prisma.service.count(),
      prisma.client.count(),
    ]);

    res.status(200).json({ numberOfServices, numberOfClients });
  }
};

export default handler;
