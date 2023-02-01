import { Package } from '@prisma/client';

export const sortPackages = (packageA: Package, packageB: Package) => {
  if (!packageA.date && !packageB.date) return 0;
  if (!packageA.date) return -1;
  if (!packageB.date) return 1;
  return new Date(packageB.date).getTime() - new Date(packageA.date).getTime();
};
