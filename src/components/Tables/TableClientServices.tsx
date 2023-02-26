import { Service } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../lib/api';
import { sortServices } from '../../utils/sortServices';
import { RowClientService } from '../Rows/RowClientService';
import { changeEditedItemToArray } from '../../utils/changeEditedItemToArray';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type TableClientServicesProps = {
  clientServices: Service[];
  clientId: string;
};

export const TableClientServices = (props: TableClientServicesProps) => {
  const [clientServices, setClientServices] = useState<Service[]>(props.clientServices.sort(sortServices));
  const [animationParent] = useAutoAnimate({
    duration: 250,
  });

  const onCreateNewRow = async () => {
    const currentUrl = document.location.origin;
    
    const serviceCreated = await api.post<Service>(`${currentUrl}/api/service`, {
      clientId: props.clientId,
    });

    setClientServices([serviceCreated.data, ...clientServices]);
  };

  const onChangePaidStatus = async (serviceId: string, value: boolean) => {
    const currentUrl = document.location.origin;

    const serviceEdited = await api.patch<Service>(`${currentUrl}/api/service/${serviceId}`, {
      paid: value,
    });

    setClientServices(changeEditedItemToArray(clientServices, serviceEdited.data));
  };

  const onDeleteAService = async (serviceId: string) => {
    const currentUrl = document.location.origin;

    await api.delete<Service>(`${currentUrl}/api/service/${serviceId}`);

    setClientServices(clientServices.filter(({ id }) => serviceId !== id));
  };

  const onSaveAService = async (savedService: Service) => {
    const currentUrl = document.location.origin;

    const savedServiceApi = await api.put<Service>(`${currentUrl}/api/service/${savedService.id}`, {
      ...savedService,
    });

    setClientServices(
      changeEditedItemToArray(clientServices, savedServiceApi.data).sort(sortServices)
    );
  };

  return (
    <>
      <ButtonPrimary
        onClick={onCreateNewRow}
        m="4"
      >
        Adicionar Nova Linha
      </ButtonPrimary>
      <TableContainer fontFamily="Poppins">
        <Table colorScheme="purple">
          <Thead>
            <Tr>
              <Th>Data</Th>
              <Th>Procedimento</Th>
              <Th>Valor</Th>
              <Th>Pago</Th>
              <Th>Salvar/Deletar</Th>
            </Tr>
          </Thead>
          <Tbody ref={animationParent}>
            {
              clientServices.map((clientService, index) => (
                <RowClientService
                  key={clientService.id}
                  clientService={clientService}
                  onChangePaidStatus={onChangePaidStatus}
                  onDelete={onDeleteAService}
                  onEditing={onSaveAService}
                  bgColor={index % 2 === 0 ? '#F1D7FF96' : 'white'}
                />
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
