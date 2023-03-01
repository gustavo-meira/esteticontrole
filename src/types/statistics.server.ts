export type CounterResponse = {
  numberOfServices: number;
  numberOfClients: number;
};

export type ServicesPossibleYearsResponse = {
  possibleYears: number[];
};

export type CounterServicesByYearResponse = {
  servicesOfTheYear: number[];
};

export type CounterClientsByAgeResponse = {
  age: number;
  count: number;
}[];
