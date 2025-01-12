/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import clsx from 'clsx';
import { removeAccessTokenToLocalStorage, removeRefreshTokenToLocalStorage } from '@/shared/lib/helpers';
import s from './Logout.module.scss';
import { AppRoutes, RoutePath } from '@/app/providers/Router/routes';
import LogoutIcon from '@/shared/assets/images/icons/logout.svg';

type TypeLogoutProps = {
    className?: string,
};

const Logout: FC<TypeLogoutProps> = ({ className }) => {
  const navigate = useNavigate();
  const redirect = (url: string) => {
    navigate(url);
  };

  const logout = () => {
    removeRefreshTokenToLocalStorage();
    removeAccessTokenToLocalStorage();
    redirect(RoutePath[AppRoutes.LOGIN]);
  };

  return (
    <div
      className={clsx(s.logout, className)}
      onClick={logout}
    >
      <LogoutIcon
        className={s.icon}
      />
    </div>
  );
};

export default Logout;
