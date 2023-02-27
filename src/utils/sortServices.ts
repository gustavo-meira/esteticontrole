import { Service } from '@prisma/client';

export const sortServices = (serviceA: Service, serviceB: Service) => {
  if (!serviceA.date && !serviceB.date) return 0;
  if (!serviceA.date) return -1;
  if (!serviceB.date) return 1;
  return new Date(serviceB.date).getTime() - new Date(serviceA.date).getTime();
};
