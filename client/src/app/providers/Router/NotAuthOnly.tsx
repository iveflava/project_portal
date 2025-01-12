import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getTokens } from '@/shared/lib/helpers';
import { AppRoutes, RoutePath } from './routes';

type TypeNotAuthOnlyProps = {
  children: JSX.Element,
  notAuthOnly: boolean,
}

export const NotAuthOnly: FC<TypeNotAuthOnlyProps> = ({ children, notAuthOnly }) => {
  const auth = getTokens().accessToken + getTokens().refreshToken;
  const location = useLocation();
  if (auth && notAuthOnly) {
    return <Navigate to={RoutePath[AppRoutes.MAIN]} state={{ from: location }} replace />;
  }
  return children;
};
