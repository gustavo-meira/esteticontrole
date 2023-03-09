import { Button, ButtonProps } from '@chakra-ui/react';
import { CaretLeft, CaretRight } from 'phosphor-react';

type ButtonForwardBackwardProps = ButtonProps & {
  direction: 'forward' | 'backward';
};

export const ButtonForwardBackward = ({ direction, ...rest }: ButtonForwardBackwardProps) => (
  <Button
    borderRadius="full"
    width="fit-content"
    backgroundColor="transparent"
    color="#635C66"
    {...rest}
  >
    {direction === 'forward' ? <CaretRight size={32} /> : <CaretLeft size={32} />}
  </Button>
);
