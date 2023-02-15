import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { api } from '../../lib/api';
import { addMonthNameToArray } from '../../utils/addMonthNameToArray';

export const ChartClientsPackages = () => {
  const [possibleYears, setPossibleYears] = useState<number[]>([]);
  const [currYear, setCurrYear] = useState<number>(new Date().getFullYear());
  const [packagesOfTheYear, setPackagesOfTheYear] = useState<number[]>([]);

  const getPossibleYears = async () => {
    const currentUrl = document.location.origin;
    const { data } = await api.get<{ possibleYears: number[] }>(`${currentUrl}/api/statistics/counter-packages-by-year`);

    setPossibleYears(data.possibleYears);
  };

  const getPackagesOfTheYear = async () => {
    const currentUrl = document.location.origin;
    const { data } = await api.get<{ packagesOfTheYear: number[] }>(`${currentUrl}/api/statistics/counter-packages-by-year`, {
      params: {
        year: currYear,
      },
    });

    setPackagesOfTheYear(data.packagesOfTheYear);
  };

  useEffect(() => {
    getPackagesOfTheYear();
  }, [currYear]);

  useEffect(() => {
    getPossibleYears();
  }, []);

  const onClickSetCurrYear = (year: number) => {
    if (!possibleYears.includes(year)) return;
    setCurrYear(year);
  };

  return (
    <div>
      <p>{currYear}</p>
      <button onClick={() => onClickSetCurrYear(currYear - 1)}>{'<'}</button>
      <button onClick={() => onClickSetCurrYear(currYear + 1)}>{'>'}</button>
      <BarChart
        width={800}
        height={300}
        data={addMonthNameToArray<number>(packagesOfTheYear)}
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
        <Legend />
        <Bar dataKey="value" name="Pacotes" fill="#8884d8" />
      </BarChart>
    </div>
  );
};
