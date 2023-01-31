import { Package } from '@prisma/client';

type RowClientPackageProps = {
  clientPackage: Package;
};

export const RowClientPackage = ({ clientPackage }: RowClientPackageProps) => {
  const packageDate = clientPackage?.date ? new Date(clientPackage.date) : null;
  packageDate?.setHours(0);
  const packageDateAsString = packageDate ? packageDate.toLocaleDateString('pt-BR') : 'A combinar';

  return (
    <tr>
      <td>{packageDateAsString}</td>
      <td>{clientPackage.treatment}</td>
      <td>{clientPackage.value}</td>
      <td>
        <input type="checkbox" checked={clientPackage.paid} />
        { clientPackage.paid ? 'Pago' : 'Devendo' }
      </td>
    </tr>
  );
};
