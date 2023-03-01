import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Link, Box } from '@chakra-ui/react';
import { Pencil } from 'phosphor-react';
import { ClientWithOptionalProps } from '../../types/client.server';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { PanelClient } from '../Panels/PanelClient';
import { PanelMeasures } from '../Panels/PanelMeasures';
import { TableClientServices } from '../Tables/TableClientServices';

type TabClientProps = {
  client: ClientWithOptionalProps<{
    measures: true,
    services: true,
  }>;
};

export const TabClient = ({ client }: TabClientProps) => (
  <>
    <Box position="relative">
      <Heading fontWeight="normal" textAlign="center" m="2">
        {client.name}
      </Heading>
      <Link width="fit-content" href={`/client/${client.id}/edit`}>
        <ButtonPrimary right="12" bottom="-4" position="absolute" display="flex" gap="2">
          <Pencil />
          Editar
        </ButtonPrimary>
      </Link>
    </Box>
    <Tabs textColor="#635C66">
      <TabList>
        <Tab>Informações gerais</Tab>
        <Tab>Medidas</Tab>
        <Tab>Atendimentos</Tab>
      </TabList>

      <TabPanels>
        <TabPanel p="0"><PanelClient client={client} /></TabPanel>
        <TabPanel p="0"><PanelMeasures clientId={client.id} measures={client.measures} /></TabPanel>
        <TabPanel p="0"><TableClientServices clientId={client.id} clientServices={client.services} /></TabPanel>
      </TabPanels>
    </Tabs>
  </>
);
