import HomeIcon from '@/shared/assets/images/icons/home.svg';
import NewsIcon from '@/shared/assets/images/icons/news.svg';
import TeamIcon from '@/shared/assets/images/icons/team.svg';
import ProjectIcon from '@/shared/assets/images/icons/projects.svg';
import PhotoalbumIcon from '@/shared/assets/images/icons/photoalbum.svg';
import ShopIcon from '@/shared/assets/images/icons/shop.svg';
import LibraryIcon from '@/shared/assets/images/icons/library.svg';
import WikiIcon from '@/shared/assets/images/icons/wiki.svg';

export const sidebarItems = [
  {
    name: 'Главная',
    icon: <HomeIcon />,
    to: '/',
  },
  {
    name: 'Команда',
    icon: <TeamIcon />,
    to: '/teams',
  },
  {
    name: 'Новости',
    icon: <NewsIcon />,
    to: '/news',
    disabled: true,
  },
  {
    name: 'Проекты',
    icon: <ProjectIcon />,
    to: '/projects',
    disabled: true,
  },
  {
    name: 'Фотоальбом',
    icon: <PhotoalbumIcon />,
    to: '/photo',
    disabled: true,
  },
  {
    name: 'Магазин',
    icon: <ShopIcon />,
    to: '/shop',
    disabled: true,
  },
  {
    name: 'Библиотека',
    icon: <LibraryIcon />,
    to: '/library',
    disabled: true,
  },
  {
    name: 'Wiki',
    icon: <WikiIcon />,
    to: '/wiki',
    disabled: true,
  },
];
