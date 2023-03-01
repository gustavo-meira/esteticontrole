import { NextApiHandler } from 'next';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['GET'];

const handler: NextApiHandler = async (req, res) => {
  if (!acceptedMethods.includes(req.method as string)) {
    return res.status(405).json({ message: 'Method not implemented.' });
  }

  const counterClientsByAge = await prisma.$queryRaw<{ age_range: string, count: bigint }[]>`
    SELECT CASE
      WHEN age BETWEEN 0 AND 10 THEN '0-10'
      WHEN age BETWEEN 11 AND 20 THEN '11-20'
      WHEN age BETWEEN 21 AND 30 THEN '21-30'
      WHEN age BETWEEN 31 AND 40 THEN '31-40'
      WHEN age BETWEEN 41 AND 50 THEN '41-50'
      WHEN age BETWEEN 51 AND 60 THEN '51-60'
      WHEN age BETWEEN 61 AND 70 THEN '61-70'
      ELSE '71+'
    END AS age_range,
    COUNT(*) AS count
      FROM (
        SELECT strftime('%Y', 'now') - strftime('%Y', datetime(birthDate/1000, 'unixepoch')) AS age
        FROM Client
      )
    GROUP BY age_range;
`;

  res.send(counterClientsByAge.map((client) => ({
    ...client,
    count: Number(client.count),
  })));
};

export default handler;
