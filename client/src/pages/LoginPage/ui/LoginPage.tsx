import { LoginForm } from '@/features/LoginFrom';
import s from './LoginPage.module.scss';

const LoginPage = () => (
  <div className={s.wrapper}>
    <LoginForm />
  </div>
);

export default LoginPage;
