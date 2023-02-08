import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ContainerBasicProps = {
  children: ReactNode;
};

export const ContainerBasic = ({ children }: ContainerBasicProps) => (
  <Container
    maxWidth="full"
    minHeight="100vh"
    display="flex"
    flexDir="column"
    bgColor="#FBFBFB"
    p="0"
    fontFamily="Poppins"
  >
    {children}
  </Container>
);
