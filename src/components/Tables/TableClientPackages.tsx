import { Package } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../lib/api';
import { sortPackages } from '../../utils/sortPackages';
import { RowClientPackage } from '../Rows/RowClientPackage';
import { changeEditedPackageToArray } from '../../utils/changeEditedPackageToArray';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

type TableClientPackagesProps = {
  clientPackages: Package[];
  clientId: string;
};

export const TableClientPackages = (props: TableClientPackagesProps) => {
  const [clientPackages, setClientPackages] = useState<Package[]>(props.clientPackages.sort(sortPackages));

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

    setClientPackages(changeEditedPackageToArray(clientPackages, packageEdited.data));
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
      changeEditedPackageToArray(clientPackages, savedPackageApi.data).sort(sortPackages)
    );
  };

  return (
    <>
      <button onClick={onCreateNewRow} type="button">Nova Linha</button>
      <TableContainer fontFamily="Poppins">
        <Table variant="striped" colorScheme="purple">
          <Thead>
            <Tr>
              <Th>Data</Th>
              <Th>Procedimento</Th>
              <Th>Valor</Th>
              <Th>Pago</Th>
              <Th>Salvar/Deletar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              clientPackages.map((clientPackage) => (
                <RowClientPackage
                  key={clientPackage.id}
                  clientPackage={clientPackage}
                  onChangePaidStatus={onChangePaidStatus}
                  onDelete={onDeleteAPackage}
                  onEditing={onSaveAPackage}
                />
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
