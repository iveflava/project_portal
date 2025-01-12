import { Sidebar } from '@/widgets/Sidebar';
import s from './MainPage.module.scss';
import Container from '@/shared/ui/Container/Container';
import { Main } from '@/features/Main';
import { MainSidebar } from '@/features/MainSidebar';

const MainPage = () => (
  <div className={s.wrapper}>
    <Sidebar />
    <Container className={s.container}>
      <Main />
      <MainSidebar />
    </Container>
  </div>
);

export default MainPage;
