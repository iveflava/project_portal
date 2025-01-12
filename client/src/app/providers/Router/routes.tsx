import { RouteProps } from 'react-router-dom';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { MainPage } from '@/pages/MainPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { EditProfilePage } from '@/pages/EditProfilePage';
import { TeamsPage } from '@/pages/TeamsPage';

export enum AppRoutes {
  NOT_FOUND = 'not_found',
  LOGIN = 'login',
  REGISTRATION = 'registartion',
  MAIN = 'main',
  PROFILE_ID = 'profile-id',
  EDIT_PROFILE_ID = 'edit-profile-id',
  TEAMS = 'teams',
}

export type AppRoutesProps = RouteProps & {
 authOnly?: boolean,
 notAuthOnly?: boolean,
};

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.NOT_FOUND]: '*',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTRATION]: '/registration',
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PROFILE_ID]: '/profile/:id',
  [AppRoutes.EDIT_PROFILE_ID]: '/edit-profile/:id',
  [AppRoutes.TEAMS]: '/teams',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath[AppRoutes.LOGIN],
    element: <LoginPage />,
    notAuthOnly: true,
  },
  [AppRoutes.REGISTRATION]: {
    path: RoutePath[AppRoutes.REGISTRATION],
    element: <RegistrationPage />,
    notAuthOnly: true,
  },
  [AppRoutes.MAIN]: {
    path: RoutePath[AppRoutes.MAIN],
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.PROFILE_ID]: {
    path: RoutePath[AppRoutes.PROFILE_ID],
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.EDIT_PROFILE_ID]: {
    path: RoutePath[AppRoutes.EDIT_PROFILE_ID],
    element: <EditProfilePage />,
    authOnly: true,
  },
  [AppRoutes.TEAMS]: {
    path: RoutePath[AppRoutes.TEAMS],
    element: <TeamsPage />,
    authOnly: true,
  },
};
