import { Sidebar } from '@/widgets/Sidebar';
import s from './EditProfilePage.module.scss';
import Container from '@/shared/ui/Container/Container';
import { Header } from '@/widgets/Header';
import { EditProfile } from '@/features/EditProfile';

const EditProfilePage = () => (
  <div className={s.wrapper}>
    <Sidebar />
    <Container className={s.container}>
      <Header
        heading="Изменить настройки профиля"
        className={s.header}
      />
      <EditProfile />
    </Container>
  </div>
);

export default EditProfilePage;
