import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { StatisticsCounterResponse } from '../../../types/statistics.server';

const acceptedMethods = ['GET'];

const handler = async (req: NextApiRequest, res: NextApiResponse<StatisticsCounterResponse | { message: string }>) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'GET') {
    const [numberOfPackages, numberOfClients] = await Promise.all([
      prisma.package.count(),
      prisma.client.count(),
    ]);

    res.status(200).json({ numberOfPackages, numberOfClients });
  }
};

export default handler;
