import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
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
  <Tabs>
    <TabList>
      <Tab>Informações gerais</Tab>
      <Tab>Medidas</Tab>
      <Tab>Pacotes</Tab>
    </TabList>

    <TabPanels>
      <TabPanel><PanelClient client={client} /></TabPanel>
      <TabPanel><PanelMeasures measures={client.measures} /></TabPanel>
      <TabPanel><TableClientPackages clientId={client.id} clientPackages={client.packages} /></TabPanel>
    </TabPanels>
  </Tabs>
);
