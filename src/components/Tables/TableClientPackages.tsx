import { Package } from '@prisma/client';
import { RowClientPackage } from '../Rows/RowClientPackage';

type TableClientPackagesProps = {
  clientPackages: Package[];
};

export const TableClientPackages = ({ clientPackages }: TableClientPackagesProps) => (
  <>
    <button type="button">Nova Linha</button>
    <table>
      <thead>
        <tr>
          <td>Data</td>
          <td>Procedimento</td>
          <td>Valor</td>
          <td>Pago</td>
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
