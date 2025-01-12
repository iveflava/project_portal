import { Navigate, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { getTokens } from '@/shared/lib/helpers';
import { AppRoutes, RoutePath } from './routes';
import { NotAuthOnly } from './NotAuthOnly';

type TypeRequireAuthProps = {
  children: JSX.Element,
  notAuthOnly: boolean,
}

export const RequireAuth: FC<TypeRequireAuthProps> = ({ children, notAuthOnly }) => {
  const auth = getTokens().accessToken + getTokens().refreshToken;
  const location = useLocation();

  if (!auth) {
    return <Navigate to={RoutePath[AppRoutes.LOGIN]} state={{ from: location }} replace />;
  }

  if (notAuthOnly) {
    return <NotAuthOnly notAuthOnly={notAuthOnly}>{children}</NotAuthOnly>;
  }

  return children;
};
