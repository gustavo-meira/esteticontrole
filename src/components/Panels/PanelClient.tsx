import { Box, Divider, Flex } from '@chakra-ui/react';
import { Client } from '@prisma/client';
import { Baby, Bandaids, Bed, BeerBottle, Brain, Cake, FirstAid, FirstAidKit, ForkKnife, MagicWand, Martini, NotePencil, Pill, Scales, Smiley, Syringe, Toilet } from 'phosphor-react';
import { RowClientInfo } from '../Rows/RowClientInfo';

type PanelClientProps = {
  client: Client;
};

export const PanelClient = ({ client }: PanelClientProps) => (
  <Box mt="2">
    <Flex
      justifyContent="space-around"
      p="2"
    >
      <RowClientInfo
        icon={<Cake />}
        info={new Date(client.birthDate).toLocaleDateString('pt-BR')}
        infoName="Data de Nascimento"
      />
      <Divider orientation="vertical" />
      <RowClientInfo
        icon={<Martini />}
        info={client.drink ? 'Sim' : 'Não'}
        infoName="Bebe"
      />
    </Flex>
    <Flex
      justifyContent="space-around"
      p="2"
      bgColor="#F1D7FF96"
    >
      <RowClientInfo
        icon={<MagicWand />}
        info={client.smoke ? 'Sim' : 'Não'}
        infoName="Fuma"
      />
      <Divider orientation="vertical" />
      <RowClientInfo
        icon={<Baby />}
        info={client.children?.toString() || 'Não possui'}
        infoName="Filhos"
      />
    </Flex>
    <Flex
      justifyContent="space-around"
      p="2"
    >
      <RowClientInfo
        icon={<Bed />}
        info={client.sleep}
        infoName="Sono"
      />
      <Divider orientation="vertical" />
      <RowClientInfo
        icon={<ForkKnife />}
        info={client.feeding}
        infoName="Alimentação"
      />
    </Flex>
    <Flex
      justifyContent="space-around"
      p="2"
      bgColor="#F1D7FF96"
    >
      <RowClientInfo
        icon={<BeerBottle />}
        info={`${client.drinkWater?.toString()}L` || 'Não possui informação'}
        infoName="Água"
      />
      <Divider orientation="vertical" />
      <RowClientInfo
        icon={<Toilet />}
        info={client.intestine}
        infoName="Intestino"
      />
    </Flex>
    <Flex
      justifyContent="space-around"
      p="2"
    >
      <RowClientInfo
        icon={<FirstAidKit />}
        info={client.surgeries || 'Não possui informação'}
        infoName="Cirurgias"
      />
      <Divider orientation="vertical" />
      <RowClientInfo
        icon={<Bandaids />}
        info={client.illnesses || 'Não possui informação'}
        infoName="Doenças"
      />
    </Flex>
    <Flex
      justifyContent="space-around"
      p="2"
      bgColor="#F1D7FF96"
    >
      <RowClientInfo
        icon={<Pill />}
        info={client.medicines || 'Não possui informação'}
        infoName="Remédios"
      />
      <Divider orientation="vertical" />
      <RowClientInfo
        icon={<Syringe />}
        info={client.illnessesInFamily || 'Não possui informação'}
        infoName="Doenças na Família"
      />
    </Flex>
    <Flex
      justifyContent="space-around"
      p="2"
    >
      <RowClientInfo
        icon={<Brain />}
        info={client.mentalHealth || 'Não possui informação'}
        infoName="Saúde mental"
      />
      <Divider orientation="vertical" />
      <RowClientInfo
        icon={<FirstAid />}
        info={client.otherTreatments || 'Não possui informação'}
        infoName="Outros Tratamentos"
      />
    </Flex>
    <Flex
      justifyContent="space-around"
      p="2"
      bgColor="#F1D7FF96"
    >
      <RowClientInfo
        icon={<Smiley />}
        info={client.indication || 'Não possui informação'}
        infoName="Indicação"
      />
      <Divider orientation="vertical" />
      <RowClientInfo
        icon={<Scales />}
        info={client.startingWeight?.toString() || 'Não possui informação'}
        infoName="Peso Inicial"
      />
    </Flex>
    <Flex mt="2" mb="4" justifyContent="center">
      <RowClientInfo
        icon={<NotePencil />}
        info={client.description || 'Não possui informação'}
        infoName="Descrição"
        last
      />
    </Flex>
  </Box>
);
