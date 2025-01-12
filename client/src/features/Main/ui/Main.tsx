import { Events } from '@/features/Events';
import s from './Main.module.scss';
import { MainNews } from '@/features/MainNews';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectGlobalStateFirstName } from '@/app/model/GlobalSelectors';

const Main = () => {
  const firstName = useAppSelector(selectGlobalStateFirstName);

  return (
    <div className={s.wrapper}>
      <div className={s.heading}>
        {firstName ? `Доброе утро, ${firstName}!` : 'Доброе утро!'}
      </div>
      <Events />
      <div className={s.news}>
        <div className={s.title}>Новости</div>
        <MainNews />
      </div>
    </div>
  );
};

export default Main;
