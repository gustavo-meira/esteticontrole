import Head from 'next/head';
import Link from 'next/link';

const Home = () => (
  <>
    <Head>
      <title>Página Inicial - Esteticontrole</title>
    </Head>
    <Link href="/create-client">
      <button type="button">
        Criar Cliente
      </button>
    </Link>
  </>
);

export default Home;
