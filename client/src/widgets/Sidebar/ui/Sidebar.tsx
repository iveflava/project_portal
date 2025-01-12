import clsx from 'clsx';
import { useEffect } from 'react';
import { matchPath } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { selectSidebarStateIsCollapsed, selectSidebarStateWasFirstRendering } from '../model/SidebarSelectors';
import s from './Sidebar.module.scss';
import SidebarMin from './SidebarMin';
import SidebarMax from './SidebarMax';
import { setWasFirstRendering } from '../model/SidebarSlice';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isCollapsed = useAppSelector(selectSidebarStateIsCollapsed);
  const wasFirstRendering = useAppSelector(selectSidebarStateWasFirstRendering);

  const isActivePath = (url: string, pathname: string) => Boolean(matchPath(url, pathname));

  useEffect(() => () => {
    dispatch(setWasFirstRendering(false));
  }, []);

  return (
    <div
      className={clsx(
        s.wrapper,
        isCollapsed ? s.open : null,
        wasFirstRendering ? s.first_render : null,
      )}
    >
      {
        isCollapsed
          ? <SidebarMax isActivePath={isActivePath} />
          : <SidebarMin isActivePath={isActivePath} />
      }
    </div>
  );
};

export default Sidebar;
