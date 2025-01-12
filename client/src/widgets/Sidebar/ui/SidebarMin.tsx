/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { FC } from 'react';
import LogoMini from '@/shared/assets/images/logo-mini.png';
import s from './SidebarMin.module.scss';
import DefaultAvatar from '@/shared/assets/images/defaultAvatar.png';
import { sidebarItems } from '../config';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import CollapseIcon from '@/shared/assets/images/icons/collapse.svg';
import { setIsCollapsed } from '../model/SidebarSlice';
import { setSidebarCollapseToLocaleStorage } from '@/shared/lib/helpers';
import { AppRoutes, RoutePath } from '@/app/providers/Router/routes';
import { selectGlobalStateGlobalAvatarSrc, selectGlobalStateUserId } from '@/app/model/GlobalSelectors';

type TypeSidebarMinProps = {
  isActivePath: (url: string, pathname: string) => boolean
}

const SidebarMin: FC<TypeSidebarMinProps> = ({ isActivePath }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const userId = useAppSelector(selectGlobalStateUserId);
  const globalAvatarSrc = useAppSelector(selectGlobalStateGlobalAvatarSrc);

  const sidebarCollapse = () => {
    dispatch(setIsCollapsed(true));
    setSidebarCollapseToLocaleStorage(true);
  };

  return (
    <div className={s.wrapper}>
      <img
        src={LogoMini}
        className={s.logo}
      />
      <Link
        className={clsx(
          s.user,
          isActivePath(RoutePath[AppRoutes.PROFILE_ID], pathname) || isActivePath(RoutePath[AppRoutes.EDIT_PROFILE_ID], pathname)
            ? `${s.active} ${s.mark}`
            : null,
        )}
        to={RoutePath[AppRoutes.PROFILE_ID].replace(':id', userId)}
      >
        <div className={s.avatar_container}>
          <img
            src={globalAvatarSrc || DefaultAvatar}
            alt="default-avatar"
            className={s.avatar}
          />
        </div>
      </Link>
      <div className={s.list}>
        {
          sidebarItems.filter((item) => !item.disabled).map((item) => (
            <Link
              key={item.to}
              className={clsx(s.item, isActivePath(item.to, pathname) ? `${s.active} ${s.mark}` : null)}
              to={item.to}
            >
              {item.icon}
            </Link>
          ))
        }
        {
          sidebarItems.filter((item) => item.disabled).map((item) => (
            <Link
              key={item.to}
              className={clsx(s.item, s.disabled)}
              to={item.to}
            >
              {item.icon}
            </Link>
          ))
        }
      </div>
      <div
        onClick={sidebarCollapse}
        className={s.collapse}
      >
        <CollapseIcon className={s.icon} />
      </div>
    </div>
  );
};

export default SidebarMin;
