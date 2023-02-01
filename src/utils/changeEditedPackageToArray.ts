import { Package } from '@prisma/client';

export const changeEditedPackageToArray = (packages: Package[], editedPackage: Package): Package[] => {
  const indexEditedPackage = packages.findIndex(({ id }) => id === editedPackage.id);
  const copyPackages = [...packages];
  copyPackages[indexEditedPackage] = editedPackage;
  return copyPackages;
};
