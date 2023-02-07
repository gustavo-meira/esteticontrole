import { ContainerBasic } from '../components/Containers/ContainerBasic';
import { FormsCreateClient } from '../components/Forms/FormsCreateClient';
import { Header } from '../components/Miscellaneous/Header';

const CreateClientPage = () => (
  <ContainerBasic>
    <Header />
    <h2>
      Criar cliente
    </h2>
    <FormsCreateClient />
  </ContainerBasic>
);

export default CreateClientPage;
