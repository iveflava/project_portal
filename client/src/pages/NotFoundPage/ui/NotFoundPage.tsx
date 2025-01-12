import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.scss';
import Logo from '@/shared/assets/images/logo.png';
import { AppRoutes, RoutePath } from '@/app/providers/Router/routes';

const NotFoundPage = () => (
  <div className={s.wrapper}>
    <img
      src={Logo}
      alt="Logo"
      className={s.img}
    />
    <div className={s.error}>404</div>
    <div className={s.text}>Страница не найдена</div>
    <Link
      className={s.button_back}
      to={RoutePath[AppRoutes.MAIN]}
    >
      На главную
    </Link>
  </div>
);

export default NotFoundPage;
