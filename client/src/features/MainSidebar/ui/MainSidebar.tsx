/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import { Logout } from '@/features/Logout';
import s from './MainSidebar.module.scss';
import { Surveys } from '@/features/Surveys';

const MainSidebar = () => (
  <div className={s.wrapper}>
    <Logout className={s.logout} />
    <Surveys />
  </div>
);

export default MainSidebar;
