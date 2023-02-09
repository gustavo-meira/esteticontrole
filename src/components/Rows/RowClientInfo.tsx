import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type RowClientInfoProps = {
  infoName: string;
  info: string;
  icon: ReactNode;
  last?: boolean;
};

export const RowClientInfo = ({ infoName, info, icon, last }: RowClientInfoProps) => (
  <Flex
    width="40%"
    justifyContent="space-between"
    alignItems="center"
    flexDir={ last ? 'column' : 'row' }
  >
    <Box>
      <Icon boxSize="8">
        {icon}
      </Icon>
      <Text as="span">
        {infoName}
      </Text>
    </Box>
    <Box 
      width={ last ? 'full' : '60%' }
      textAlign={ last ? 'center' : 'right' }
    >
      {info}
    </Box>
  </Flex>
);
