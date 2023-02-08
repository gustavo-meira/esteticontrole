import { Button, ButtonProps } from '@chakra-ui/react';

export const ButtonPrimary = ({ children, ...rest }: ButtonProps) => (
  <Button 
    type="button"
    variant="solid"
    border="2px solid #734A91"
    bgColor="#734A91"
    color="#FFFFFF"
    colorScheme="purple"
    fontFamily="Poppins"
    {...rest}
  >
    {children}
  </Button>
);
