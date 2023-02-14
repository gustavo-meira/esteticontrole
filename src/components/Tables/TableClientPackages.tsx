import { Package } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../lib/api';
import { sortPackages } from '../../utils/sortPackages';
import { RowClientPackage } from '../Rows/RowClientPackage';
import { changeEditedItemToArray } from '../../utils/changeEditedItemToArray';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type TableClientPackagesProps = {
  clientPackages: Package[];
  clientId: string;
};

export const TableClientPackages = (props: TableClientPackagesProps) => {
  const [clientPackages, setClientPackages] = useState<Package[]>(props.clientPackages.sort(sortPackages));
  const [animationParent] = useAutoAnimate({
    duration: 250,
  });

  const onCreateNewRow = async () => {
    const currentUrl = document.location.origin;
    
    const packageCreated = await api.post<Package>(`${currentUrl}/api/package`, {
      clientId: props.clientId,
    });

    setClientPackages([packageCreated.data, ...clientPackages]);
  };

  const onChangePaidStatus = async (packageId: string, value: boolean) => {
    const currentUrl = document.location.origin;

    const packageEdited = await api.patch<Package>(`${currentUrl}/api/package/${packageId}`, {
      paid: value,
    });

    setClientPackages(changeEditedItemToArray(clientPackages, packageEdited.data));
  };

  const onDeleteAPackage = async (packageId: string) => {
    const currentUrl = document.location.origin;

    await api.delete<Package>(`${currentUrl}/api/package/${packageId}`);

    setClientPackages(clientPackages.filter(({ id }) => packageId !== id));
  };

  const onSaveAPackage = async (savedPackage: Package) => {
    const currentUrl = document.location.origin;

    const savedPackageApi = await api.put<Package>(`${currentUrl}/api/package/${savedPackage.id}`, {
      ...savedPackage,
    });

    setClientPackages(
      changeEditedItemToArray(clientPackages, savedPackageApi.data).sort(sortPackages)
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
              clientPackages.map((clientPackage, index) => (
                <RowClientPackage
                  key={clientPackage.id}
                  clientPackage={clientPackage}
                  onChangePaidStatus={onChangePaidStatus}
                  onDelete={onDeleteAPackage}
                  onEditing={onSaveAPackage}
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
