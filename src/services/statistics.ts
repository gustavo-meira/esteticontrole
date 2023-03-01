import { api } from '../lib/api';
import { CounterClientsByAgeResponse, CounterResponse, CounterServicesByYearResponse, ServicesPossibleYearsResponse } from '../types/statistics.server';

const counterClientsAndServices = async (): Promise<CounterResponse> => {
  try {
    const { data } = await api.get<CounterResponse>('/api/statistics/counter');

    return data;
  } catch {
    return {
      numberOfClients: 0,
      numberOfServices: 0,
    };
  }
};

const getServicesPossibleYears = async (): Promise<ServicesPossibleYearsResponse> => {
  try {
    const routeUrl = '/api/statistics/counter-services-by-year';

    const { data } = await api.get<ServicesPossibleYearsResponse>(routeUrl);

    return data;
  } catch {
    return {
      possibleYears: [new Date().getFullYear()],
    };
  }
};

const counterServicesByYear = async (year: number): Promise<CounterServicesByYearResponse> => {
  try {
    const routeUrl = '/api/statistics/counter-services-by-year';

    const { data } = await api.get<CounterServicesByYearResponse>(routeUrl, {
      params: {
        year,
      },
    });

    return data;
  } catch {
    return {
      servicesOfTheYear: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  }
};

const counterClientsByAge = async (): Promise<CounterClientsByAgeResponse> => {
  try {
    const routeUrl = '/api/statistics/counter-clients-by-age';

    const { data } = await api.get<CounterClientsByAgeResponse>(routeUrl);

    return data;
  } catch {
    return [];
  }
};

const statisticsService = {
  counterClientsAndServices,
  getServicesPossibleYears,
  counterServicesByYear,
  counterClientsByAge,
};

export default statisticsService;
