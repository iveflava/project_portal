import { useNavigate } from 'react-router-dom';
import React, { ChangeEvent, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import {
  selectRegistrationFormErrorLogin, selectRegistrationFormErrorPassword, selectRegistrationFormLogin, selectRegistrationFormPassword,
} from '../model/RegistrationFormSelectors';
import { clearState, setLogin, setPassword } from '../model/RegistrationFormSlice';
import { fetchRegistrationAsyncThunk } from '../model/RegistrationFormAsyncThunks';
import s from './RegistrationFrom.module.scss';
import InputContainer from '@/shared/ui/InputContainer/InputContainer';
import Input from '@/shared/ui/Input/Input';
import Anchor from '@/shared/ui/Anchor/Anchor';
import Button from '@/shared/ui/Button/Button';
import { AppRoutes, RoutePath } from '@/app/providers/Router/routes';
import { fetchProfileAsyncThunk } from '@/app/model/GlobalAsyncThunk';

const RegistrationFrom = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const redirect = (url: string) => {
    navigate(url);
  };

  const login = useAppSelector(selectRegistrationFormLogin);
  const errorLogin = useAppSelector(selectRegistrationFormErrorLogin);
  const password = useAppSelector(selectRegistrationFormPassword);
  const errorPassword = useAppSelector(selectRegistrationFormErrorPassword);

  const buttonIsDisabled = useMemo(() => !(login && password), [login, password]);

  const clickHandler = async () => {
    await dispatch(fetchRegistrationAsyncThunk({ login, password, redirect }));
    await dispatch(fetchProfileAsyncThunk({ redirect }));
  };

  useEffect(() => () => {
    dispatch(clearState());
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.form}>
        <div className={s.heading}>Регистрация</div>
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
        <div className={s.text}>Продолжая, вы соглашаетесь со сбором, обработкой персональных данных</div>
        <Button
          mode="purple"
          onClick={() => clickHandler()}
          disabled={buttonIsDisabled}
        >
          Зарегистрироваться
        </Button>
      </div>
      <div className={s.text_bottom}>
        У вас уже есть аккаунт?
        {' '}
        <Anchor
          to={RoutePath[AppRoutes.LOGIN]}
        >
          Войти
        </Anchor>
      </div>
    </div>
  );
};

export default RegistrationFrom;
