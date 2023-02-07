import Head from 'next/head';
import { ContainerBasic } from '../components/Containers/ContainerBasic';
import { Header } from '../components/Miscellaneous/Header';

const Home = () => (
  <ContainerBasic>
    <Head>
      <title>Página Inicial - Esteticontrole</title>
    </Head>
    <Header />
  </ContainerBasic>
);

export default Home;
