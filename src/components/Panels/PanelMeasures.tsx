import { Measures } from '@prisma/client';

type PanelMeasuresProps = {
  measures?: Measures;
};

export const PanelMeasures = ({}: PanelMeasuresProps) => (
  <h2>painel de medidas</h2>
);
