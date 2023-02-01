import { Package } from '@prisma/client';
import { useState } from 'react';

type RowClientPackageProps = {
  clientPackage: Package;
  onChangePaidStatus: (packageId: string, value: boolean) => void;
  onDelete: (packageId: string) => void;
};

export const RowClientPackage = ({ clientPackage, onChangePaidStatus, onDelete }: RowClientPackageProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const packageDate = clientPackage?.date ? new Date(clientPackage.date) : null;
  packageDate?.setHours(0);
  const packageDateAsString = packageDate ? packageDate.toLocaleDateString('pt-BR') : 'A combinar';

  if (isEditing) {
    return (
      <tr>
        <td><input type="date" /></td>
        <td><input type="text" /></td>
        <td><input type="number" step=".01" /></td>
        <td>
          <input type="checkbox" checked={clientPackage.paid} />
          { clientPackage.paid ? 'Pago' : 'Devendo' }
        </td>
        <td>
          <button onClick={() => setIsEditing(false)} type="button">Salvar</button>
          <button onClick={() => onDelete(clientPackage.id)}>Deletar</button>
        </td>
      </tr>
    );
  }

  return (
    <tr onDoubleClick={() => setIsEditing(true)}>
      <td>{packageDateAsString}</td>
      <td>{clientPackage.treatment}</td>
      <td>{clientPackage.value}</td>
      <td>
        <input
          onChange={() => onChangePaidStatus(clientPackage.id, !clientPackage.paid)}
          type="checkbox"
          checked={clientPackage.paid}
        />
        { clientPackage.paid ? 'Pago' : 'Devendo' }
      </td>
    </tr>
  );
};
