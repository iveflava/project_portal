/* eslint-disable jsx-a11y/alt-text */
import s from './Loader.module.scss';
import Logo from '@/shared/assets/images/logo.png';

const Loader = () => (
  <div className={s.container}>
    <img
      src={Logo}
      className={s.logo}
    />
  </div>
);

export default Loader;
