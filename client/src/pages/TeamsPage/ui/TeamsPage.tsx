import { Sidebar } from '@/widgets/Sidebar';
import s from './TeamsPage.module.scss';
import Container from '@/shared/ui/Container/Container';
import { Header } from '@/widgets/Header';
import { Teams } from '@/features/Teams';

const TeamsPage = () => (
  <div className={s.wrapper}>
    <Sidebar />
    <Container className={s.container}>
      <Header
        heading="Команда"
        className={s.header}
      />
      <Teams />
    </Container>
  </div>
);

export default TeamsPage;
