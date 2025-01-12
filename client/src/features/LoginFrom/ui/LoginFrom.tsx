import { ChangeEvent, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import {
  selectLoginFormErrorLogin, selectLoginFormErrorPassword, selectLoginFormLogin, selectLoginFormPassword,
} from '../model/LoginFormSelectors';
import { clearState, setLogin, setPassword } from '../model/LoginFormSlice';
import { fetchLoginAsyncThunk } from '../model/LoginFormAsyncThunk';
import s from './LoginFrom.module.scss';
import InputContainer from '@/shared/ui/InputContainer/InputContainer';
import { AppRoutes, RoutePath } from '@/app/providers/Router/routes';
import Anchor from '@/shared/ui/Anchor/Anchor';
import { fetchProfileAsyncThunk } from '@/app/model/GlobalAsyncThunk';

const LoginFrom = () => {
  const navigate = useNavigate();
  const redirect = (url: string) => {
    navigate(url);
  };
  const dispatch = useAppDispatch();

  const login = useAppSelector(selectLoginFormLogin);
  const errorLogin = useAppSelector(selectLoginFormErrorLogin);
  const password = useAppSelector(selectLoginFormPassword);
  const errorPassword = useAppSelector(selectLoginFormErrorPassword);

  const buttonIsDisabled = useMemo(() => !(login && password), [login, password]);

  const loginHandler = async () => {
    await dispatch(fetchLoginAsyncThunk({ login, password, redirect }));
    await dispatch(fetchProfileAsyncThunk({ redirect }));
  };

  useEffect(() => () => {
    dispatch(clearState());
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.form}>
        <div className={s.heading}>Вход</div>
        <InputContainer
          label="Логин"
          className={s.input_container}
          error={errorLogin}
        >
          <Input
            value={login}
            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setLogin(e.target.value))}
            error={errorLogin}
          />
        </InputContainer>
        <InputContainer
          label="Пароль"
          className={s.input_container}
          error={errorPassword}
        >
          <Input
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setPassword(e.target.value))}
            error={errorPassword}
          />
        </InputContainer>
        <Button
          mode="purple"
          className={s.button}
          onClick={loginHandler}
          disabled={buttonIsDisabled}
        >
          Войти
        </Button>
      </div>
      <div className={s.text_bottom}>
        У вас нет аккаунта?
        {' '}
        <Anchor
          to={RoutePath[AppRoutes.REGISTRATION]}
        >
          Зарегистрироваться
        </Anchor>
      </div>
    </div>
  );
};

export default LoginFrom;
