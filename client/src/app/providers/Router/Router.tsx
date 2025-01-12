/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
import { Route, Routes } from 'react-router-dom';
import React, { memo, useCallback } from 'react';
import { AppRoutesProps, routeConfig } from './routes';
import { RequireAuth } from './RequireAuth';
import { NotAuthOnly } from './NotAuthOnly';

const AppRouter = () => {
  const renderRoutes = useCallback((route: AppRoutesProps) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        route.authOnly
          ? <RequireAuth notAuthOnly={route.notAuthOnly}><>{route.element}</></RequireAuth>
          : route.notAuthOnly
            ? <NotAuthOnly notAuthOnly={route.notAuthOnly}><>{route.element}</></NotAuthOnly>
            : (route.element)
      }
    />
  ), []);

  return <Routes>{Object.values(routeConfig).map(renderRoutes)}</Routes>;
};

export default memo(AppRouter);
