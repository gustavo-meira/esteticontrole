import { Checkbox, Input, Td, Tr } from '@chakra-ui/react';
import { Package } from '@prisma/client';
import { useState } from 'react';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';

type RowClientPackageProps = {
  clientPackage: Package;
  onChangePaidStatus: (packageId: string, value: boolean) => void;
  onDelete: (packageId: string) => void;
  onEditing: (clientPackage: Package) => Promise<void>;
  bgColor?: string;
};

export const RowClientPackage = ({ clientPackage, onChangePaidStatus, onDelete, onEditing, bgColor }: RowClientPackageProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const packageDate = clientPackage?.date ? new Date(clientPackage.date) : null;
  packageDate?.setHours(0);
  const packageDateAsString = packageDate ? packageDate.toLocaleDateString('pt-BR') : 'A combinar';

  const [dateEdit, setDateEdit] = useState(packageDate?.toISOString().slice(0, 10) || '');
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
    return (
      <Tr bgColor={bgColor} height="53px">
        <Td><Input bgColor="white" onChange={(e) => setDateEdit(e.target.value)} value={dateEdit} type="date" /></Td>
        <Td><Input bgColor="white" onChange={(e) => setTreatmentEdit(e.target.value)} value={treatmentEdit || ''} type="text" /></Td>
        <Td><Input bgColor="white" onChange={(e) => setValueEdit(e.target.value)} value={valueEdit} type="number" step=".01" /></Td>
        <Td>
          <Checkbox
            borderColor="black"
            colorScheme="purple"
            onChange={() => setPaidEdit(!paidEdit)}
            isChecked={paidEdit}
          >
            { paidEdit ? 'Pago' : 'Devendo' }
          </Checkbox>
        </Td>
        <Td
          display="flex"
          gap="2"
        >
          <ButtonPrimary onClick={onSaveClick}>Salvar</ButtonPrimary>
          <ButtonSecondary onClick={() => onDelete(clientPackage.id)}>Deletar</ButtonSecondary>
        </Td>
      </Tr>
    );
  }

  return (
    <Tr bgColor={bgColor} height="4" onDoubleClick={() => setIsEditing(true)}>
      <Td>{packageDateAsString}</Td>
      <Td>{clientPackage.treatment}</Td>
      <Td isNumeric>{clientPackage.value}</Td>
      <Td>
        <Checkbox
          onChange={() => onChangePaidStatus(clientPackage.id, !clientPackage.paid)}
          isChecked={clientPackage.paid}
          colorScheme="purple"
          borderColor="black"
          mr="2"
        >
          { clientPackage.paid ? 'Pago' : 'Devendo' }
        </Checkbox>
      </Td>
      <Td />
    </Tr>
  );
};
