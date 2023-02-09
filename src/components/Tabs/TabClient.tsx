import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Client, Measures, Package } from '@prisma/client';
import { PanelClient } from '../Panels/PanelClient';
import { PanelMeasures } from '../Panels/PanelMeasures';
import { TableClientPackages } from '../Tables/TableClientPackages';

type TabClientProps = {
  client: Client & {
    measures?: Measures;
    packages: Package[];
  };
};

export const TabClient = ({ client }: TabClientProps) => (
  <>
    <Heading textAlign="center" m="2">
      {client.name}
    </Heading>
    <Tabs>
      <TabList>
        <Tab>Informações gerais</Tab>
        <Tab>Medidas</Tab>
        <Tab>Pacotes</Tab>
      </TabList>

      <TabPanels>
        <TabPanel p="0"><PanelClient client={client} /></TabPanel>
        <TabPanel p="0"><PanelMeasures measures={client.measures} /></TabPanel>
        <TabPanel p="0"><TableClientPackages clientId={client.id} clientPackages={client.packages} /></TabPanel>
      </TabPanels>
    </Tabs>
  </>
);
