import Link from 'next/link';
import { Flex, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react';

type TextLinkProps = {
  href: string;
  text: string;
};

const TextLink = ({href, text}: TextLinkProps) => (
  <Link href={href}>
    <Text
      fontFamily="Poppins"
      fontSize="3xl"
      color="#00000099"
      _hover={{
        textDecor: 'underline',
      }}
    >
      {text}
    </Text>
  </Link>
);

export const Header = () => (
  <Flex
    as="header"
    backgroundColor="#F1D7FF96"
    height="32"
    pl="7"
    pr="7"
    justifyContent="space-between"
  >
    <Link href="/">
      <Flex
        gap="7"
        alignItems="center"
        height="full"
      >
        <Image
          src="/assets/lotus-flower.svg"
          alt="Flor de lótus"
          width={98}
          height={98}
        />
        <Text
          fontFamily="Parisienne"
          fontSize="6xl"
          color="black"
        >
        EstetiControle
        </Text>
      </Flex>
    </Link>
    <nav>
      <UnorderedList
        display="flex"
        gap="5"
        alignItems="center"
        height="full"
        listStyleType="none"
      >
        <ListItem><TextLink href="/schedule" text="Agenda" /></ListItem>
        <ListItem><TextLink href="/client" text="Cliente" /></ListItem>
        <ListItem><TextLink href="/statistics" text="Estatísticas" /></ListItem>
      </UnorderedList>
    </nav>
  </Flex>
);
