import { Client, Measures, Service } from '@prisma/client';

export type clientOptionalProps = {
  measures?: boolean;
  services?: boolean;
};

export type ClientWithOptionalProps<T extends clientOptionalProps> = Client & {
  measures: (T extends { measures: true } ? Measures[] : undefined);
  services: (T extends { services: true } ? Service[] : undefined);
};

