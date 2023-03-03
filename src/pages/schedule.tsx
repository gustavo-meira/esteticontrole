import { ContainerBasic } from '../components/Containers/ContainerBasic';
import { Header } from '../components/Miscellaneous/Header';
import { PanelSchedules } from '../components/Panels/PanelSchedules';

const SchedulePage = () => (
  <ContainerBasic>
    <Header />
    <PanelSchedules />
  </ContainerBasic>
);

export default SchedulePage;
