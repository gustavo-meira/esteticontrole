import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { addMonthNameToArray } from '../../utils/addMonthNameToArray';
import { ButtonForwardBackward } from '../Buttons/ButtonForwardBackward';
import statisticsService from '../../services/statistics';

export const ChartClientsServices = () => {
  const [possibleYears, setPossibleYears] = useState<number[]>([]);
  const [currYear, setCurrYear] = useState<number>(new Date().getFullYear());
  const [servicesOfTheYear, setServicesOfTheYear] = useState<number[]>([]);

  const getPossibleYears = async () => {
    const possibleYearsApi = await statisticsService.getServicesPossibleYears();

    setPossibleYears(possibleYearsApi.possibleYears);
  };

  const getServicesOfTheYear = async () => {
    const servicesOfTheYearApi = await statisticsService.counterServicesByYear(currYear);

    setServicesOfTheYear(servicesOfTheYearApi.servicesOfTheYear);
  };

  useEffect(() => {
    getServicesOfTheYear();
  }, [currYear]);

  useEffect(() => {
    getPossibleYears();
  }, []);

  const onClickSetCurrYear = (year: number) => {
    if (!possibleYears.includes(year)) return;
    setCurrYear(year);
  };

  return (
    <Box mt="12" color="#635C66">
      <Flex
        alignItems="center"
        gap="2"
        justifyContent="space-between"
        pr="6"
        pl="20"
        mb="2"
      >
        <Heading
          fontWeight="normal"
          textAlign="left"
          fontSize="3xl"
        >
          Atendimentos por ano
        </Heading>
        <Box>
          <ButtonForwardBackward direction="backward" onClick={() => onClickSetCurrYear(currYear - 1)} />
          <Text display="inline-block" fontSize="lg">{currYear}</Text>
          <ButtonForwardBackward direction="forward" onClick={() => onClickSetCurrYear(currYear + 1)} />
        </Box>
      </Flex>
      <BarChart
        width={800}
        height={300}
        data={addMonthNameToArray<number>(servicesOfTheYear)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" name="Atendimentos" fill="#8884d8" />
      </BarChart>
    </Box>
  );
};
