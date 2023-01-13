import Head from 'next/head';
import Link from 'next/link';
import { Header } from '../components/Miscellaneous/Header';

const Home = () => (
  <>
    <Head>
      <title>Página Inicial - Esteticontrole</title>
    </Head>
    <Header />
    <Link href="/create-client">
      <button type="button">
        Criar Cliente
      </button>
    </Link>
  </>
);

export default Home;
