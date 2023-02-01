import { Package } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../lib/api';

type RowClientPackageProps = {
  clientPackage: Package;
};

export const RowClientPackage = ({ clientPackage }: RowClientPackageProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const packageDate = clientPackage?.date ? new Date(clientPackage.date) : null;
  packageDate?.setHours(0);
  const packageDateAsString = packageDate ? packageDate.toLocaleDateString('pt-BR') : 'A combinar';

  const [paidEdit, setPaidEdit] = useState(clientPackage.paid);

  const onChangePaid = async () => {
    const currentUrl = document.location.origin;

    const packageEdited = await api.patch<Package>(`${currentUrl}/api/package/${clientPackage.id}`, {
      id: clientPackage.id,
      paid: !paidEdit,
    });

    setPaidEdit(packageEdited.data.paid);
  };

  if (isEditing) {
    return (
      <tr>
        <td><input type="date" /></td>
        <td><input type="text" /></td>
        <td><input type="number" step=".01" /></td>
        <td>
          <input type="checkbox" checked={paidEdit} />
          { paidEdit ? 'Pago' : 'Devendo' }
        </td>
        <td>
          <button onClick={() => setIsEditing(false)} type="button">Salvar</button>
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
        <input onChange={onChangePaid} type="checkbox" checked={paidEdit} />
        { paidEdit ? 'Pago' : 'Devendo' }
      </td>
    </tr>
  );
};
