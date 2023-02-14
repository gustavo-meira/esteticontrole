import { Flex } from '@chakra-ui/react';
import { Measures } from '@prisma/client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type ChartClientMeasuresProps = {
  measures: Measures[],
};

export const ChartClientMeasures = ({ measures }: ChartClientMeasuresProps) => {
  const measuresWithDateTranslated = measures.map((measure) => ({
    ...measure,
    measuredDate: new Date(measure.measuredDate).toLocaleDateString('pt-BR'),
  }));

  return (
    <Flex mt="4" justifyContent="center" maxH="500px" width="100%">
      <LineChart
        width={800}
        height={400}
        data={measuresWithDateTranslated}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        id="chart-client-measures"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="measuredDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" name="Braço Direito" dataKey="rightArm" stroke="#8b4513" />
        <Line type="monotone" name="Braço Esquerdo" dataKey="leftArm" stroke="#006400" />
        <Line type="monotone" name="Abdomen superior" dataKey="upperAbdomen" stroke="#4682b4" />
        <Line type="monotone" name="Abdomen inferior" dataKey="lowerAbdomen" stroke="#ff0000" />
        <Line type="monotone" name="Cintura" dataKey="waist" stroke="#4b0082" />
        <Line type="monotone" name="Bumbum" dataKey="butt" stroke="#00ff7f" />
        <Line type="monotone" name="Coxa Direita" dataKey="rightThigh" stroke="#00ffff" />
        <Line type="monotone" name="Coxa Esquerda" dataKey="leftThigh" stroke="#ff69b4" />
        <Line type="monotone" name="Joelho Direito" dataKey="rightKnee" stroke="#0000ff" />
        <Line type="monotone" name="Joelho Esquerdo" dataKey="leftKnee" stroke="#ffe4c4" />
        <Line type="monotone" name="Peso" dataKey="weight" stroke="#000000" />
      </LineChart>
    </Flex>
  );};
