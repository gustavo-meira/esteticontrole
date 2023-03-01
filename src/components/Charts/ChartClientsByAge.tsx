import { Box, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import statisticsService from '../../services/statistics';
import { CounterClientsByAgeResponse } from '../../types/statistics.server';

const chartColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#33FF99'];

export const ChartClientsByAge = () => {
  const [clientsByAge, setClientsByAge] = useState<CounterClientsByAgeResponse>([]);

  useEffect(() => {
    const getClientsByAge = async () => {
      const clientsByAgeApi = await statisticsService.counterClientsByAge();

      setClientsByAge(clientsByAgeApi);
    };

    getClientsByAge();
  }, []);

  return (
    <Box mt="12" color="#635C66">
      <Flex
        alignItems="center"
        pl="20"
        mb="2"
      >
        <Heading
          fontWeight="normal"
          fontSize="3xl"
          mb="-24"
        >
          Clientes por faixa etária
        </Heading>
      </Flex>
      <PieChart
        width={500}
        height={500}
      >
        <Pie
          data={clientsByAge}
          dataKey="count"
          nameKey="age_range"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {
            clientsByAge.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))
          }
        </Pie>
        <Tooltip />
      </PieChart>
    </Box>
  );
};
