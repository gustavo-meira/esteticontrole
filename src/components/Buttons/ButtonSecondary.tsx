import { Button, ButtonProps } from '@chakra-ui/react';

export const ButtonSecondary = ({ children, ...rest }: ButtonProps) => (
  <Button
    type="button"
    variant="solid"
    border="2px solid #A87BC7"
    bgColor="#FFFFFF"
    color="#A87BC7"
    colorScheme="whiteAlpha"
    fontFamily="Poppins"
    fontWeight="normal"
    {...rest}
  >
    {children}
  </Button>
);
