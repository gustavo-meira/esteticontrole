import { Package } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../lib/api';
import { sortPackages } from '../../utils/sortPackages';
import { RowClientPackage } from '../Rows/RowClientPackage';

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

  return (
    <>
      <button onClick={onCreateNewRow} type="button">Nova Linha</button>
      <table>
        <thead>
          <tr>
            <td>Data</td>
            <td>Procedimento</td>
            <td>Valor</td>
            <td>Pago</td>
            <td>Salvar/Deletar</td>
          </tr>
        </thead>
        <tbody>
          {
            clientPackages.map((clientPackage) => (
              <RowClientPackage
                key={clientPackage.id}
                clientPackage={clientPackage}
              />
            ))
          }
        </tbody>
      </table>
    </>
  );
};
