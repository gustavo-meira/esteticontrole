import { Checkbox, Input, Td, Tr } from '@chakra-ui/react';
import { Service } from '@prisma/client';
import { useState } from 'react';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';

type RowClientServiceProps = {
  clientService: Service;
  onChangePaidStatus: (serviceId: string, value: boolean) => void;
  onDelete: (serviceId: string) => void;
  onEditing: (clientService: Service) => Promise<void>;
  bgColor?: string;
};

export const RowClientService = ({ clientService, onChangePaidStatus, onDelete, onEditing, bgColor }: RowClientServiceProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const serviceDate = clientService?.date ? new Date(clientService.date) : null;
  serviceDate?.setHours(0);
  const serviceDateAsString = serviceDate ? serviceDate.toLocaleDateString('pt-BR') : 'A combinar';

  const [dateEdit, setDateEdit] = useState(serviceDate?.toISOString().slice(0, 10) || '');
  const [treatmentEdit, setTreatmentEdit] = useState(clientService.treatment || '');
  const [valueEdit, setValueEdit] = useState(clientService.value?.toString() || '');
  const [paidEdit, setPaidEdit] = useState(clientService.paid);

  const onSaveClick = async () => {
    const dateToSend = dateEdit !== null ? new Date(dateEdit) : null;

    if (dateToSend instanceof Date) {
      dateToSend.setDate(dateToSend.getDate() + 1);
    }

    await onEditing({
      id: clientService.id,
      clientId: clientService.clientId,
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
          <ButtonSecondary onClick={() => onDelete(clientService.id)}>Deletar</ButtonSecondary>
        </Td>
      </Tr>
    );
  }

  return (
    <Tr bgColor={bgColor} height="4" onDoubleClick={() => setIsEditing(true)}>
      <Td>{serviceDateAsString}</Td>
      <Td>{clientService.treatment}</Td>
      <Td isNumeric>{clientService.value}</Td>
      <Td>
        <Checkbox
          onChange={() => onChangePaidStatus(clientService.id, !clientService.paid)}
          isChecked={clientService.paid}
          colorScheme="purple"
          borderColor="black"
          mr="2"
        >
          { clientService.paid ? 'Pago' : 'Devendo' }
        </Checkbox>
      </Td>
      <Td />
    </Tr>
  );
};
