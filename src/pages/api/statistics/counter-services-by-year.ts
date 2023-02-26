import { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodError } from 'zod';
import { prisma } from '../../../lib/prisma';

const acceptedMethods = ['GET'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!acceptedMethods.includes(req.method as string)) {
    res.status(405).json({ message: 'Method not implemented.' });
  }

  if (req.method === 'GET') {
    const mostOldYear = 2015;
    const mostRecentYear = new Date().getFullYear();

    const possibleYears = Array.from({ length: mostRecentYear - mostOldYear + 1 }, (_, i) => i + mostOldYear);

    if (!req.query.year) {
      res.status(200).json({ possibleYears });
    } else {
      const queryYearSchema = z
        .string()
        .regex(/^\d+$/, { message: 'year must be a numeric string' })
        .transform((value) => Number(value))
        .refine((value) => possibleYears.includes(value), { message: 'year must be in possible years' });

      try {
        const year = queryYearSchema.parse(req.query.year);

        const servicesOfTheYear = await Promise.all(
          Array.from({ length: 12 }, (_, i) => i + 1).map(async (month) => {
            const yearMaxToSearch = month + 1 > 12 ? year + 1 : year;
            const monthMaxToSearch = month + 1 > 12 ? 1 : month + 1;

            const services = await prisma.service.count({
              where: {
                date: {
                  gte: new Date(`${year}-${month}-01`),
                  lt: new Date(`${yearMaxToSearch}-${monthMaxToSearch}-01`),
                },
              },
            });
            
            return services;
          })
        );

        res.status(200).json({ servicesOfTheYear });
      } catch (err) {
        if (err instanceof ZodError) {
          return res.status(400).json(err.message);
        }

        res.status(500).end();
      }

    }
  }
};

export default handler;
