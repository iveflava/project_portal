import { useParams } from 'react-router-dom';
import { Sidebar } from '@/widgets/Sidebar';
import s from './ProfilePage.module.scss';
import Container from '@/shared/ui/Container/Container';
import { Profile } from '@/features/Profile';
import { Header } from '@/widgets/Header';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectGlobalStateUserId } from '@/app/model/GlobalSelectors';

const ProfilePage = () => {
  const { id } = useParams();

  const userId = useAppSelector(selectGlobalStateUserId);

  return (
    <div className={s.wrapper}>
      <Sidebar />
      <Container className={s.container}>
        <Header
          heading={userId === id ? 'Мой профиль' : 'Профиль'}
          className={s.header}
        />
        <Profile />
      </Container>
    </div>
  );
};

export default ProfilePage;
