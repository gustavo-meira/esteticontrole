import { Package } from '@prisma/client';
import { useState } from 'react';

type RowClientPackageProps = {
  clientPackage: Package;
  onChangePaidStatus: (packageId: string, value: boolean) => void;
  onDelete: (packageId: string) => void;
  onEditing: (clientPackage: Package) => Promise<void>;
};

export const RowClientPackage = ({ clientPackage, onChangePaidStatus, onDelete, onEditing }: RowClientPackageProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const packageDate = clientPackage?.date ? new Date(clientPackage.date) : null;
  packageDate?.setHours(0);
  const packageDateAsString = packageDate ? packageDate.toLocaleDateString('pt-BR') : 'A combinar';

  const [dateEdit, setDateEdit] = useState<Date | null>(packageDate);
  const [treatmentEdit, setTreatmentEdit] = useState(clientPackage.treatment || '');
  const [valueEdit, setValueEdit] = useState(clientPackage.value?.toString() || '');
  const [paidEdit, setPaidEdit] = useState(clientPackage.paid);

  const onSaveClick = async () => {
    const dateToSend = dateEdit !== null ? new Date(dateEdit) : null;

    if (dateToSend instanceof Date) {
      dateToSend.setDate(dateToSend.getDate() + 1);
    }

    await onEditing({
      id: clientPackage.id,
      clientId: clientPackage.clientId,
      date: dateToSend,
      paid: paidEdit,
      treatment: treatmentEdit !== '' ? treatmentEdit : null,
      value: valueEdit !== '' ? Number(valueEdit) : null,
    });

    setIsEditing(false);
  };

  if (isEditing) {
    let dateToEdit = '';

    if (dateEdit !== null) {
      try {
        dateToEdit = new Date(dateEdit).toISOString().slice(0, 10);
      } catch {}
    }

    return (
      <tr>
        <td><input onChange={(e) => setDateEdit(new Date(e.target.value))} value={dateToEdit} type="date" /></td>
        <td><input onChange={(e) => setTreatmentEdit(e.target.value)} value={treatmentEdit || ''} type="text" /></td>
        <td><input onChange={(e) => setValueEdit(e.target.value)} value={valueEdit} type="number" step=".01" /></td>
        <td>
          <input onChange={() => setPaidEdit(!paidEdit)} type="checkbox" checked={paidEdit} />
          { paidEdit ? 'Pago' : 'Devendo' }
        </td>
        <td>
          <button onClick={onSaveClick} type="button">Salvar</button>
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
