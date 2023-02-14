import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ContainerBasic } from '../components/Containers/ContainerBasic';
import { Header } from '../components/Miscellaneous/Header';

const Home = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/client');
  }, []);

  return (
    <ContainerBasic>
      <Head>
        <title>Página Inicial - Esteticontrole</title>
      </Head>
      <Header />
    </ContainerBasic>
  );
};

export default Home;
