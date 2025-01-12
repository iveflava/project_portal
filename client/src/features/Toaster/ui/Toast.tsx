/* eslint-disable consistent-return */
/* eslint-disable unused-imports/no-unused-vars */
import { FC, ReactNode, useEffect } from 'react';
import s from './Toast.module.scss';
import ToastGreenIcon from '@/shared/assets/images/icons/toastGreenIcon.svg';
import ToastYellowIcon from '@/shared/assets/images/icons/toastYellowIcon.svg';
import ToastRedIcon from '@/shared/assets/images/icons/toastRedIcon.svg';
import ToastLoadingIcon from '@/shared/assets/images/icons/toastLoadingIcon.svg';
import ToastButtonIcon from '@/shared/assets/images/icons/toastButtonIcon.svg';

type PropsToast = {
    children?: ReactNode,
    mode: 'green' | 'yellow' | 'red' | 'loading' | 'finish',
    onDelete: () => void,
  }

const Toast: FC<PropsToast> = ({ children, mode, onDelete }) => {
  useEffect(() => {
    if (mode !== 'loading') {
      const id = setTimeout(() => {
        onDelete();
      }, 7000);

      return () => {
        clearTimeout(id);
      };
    }
  }, []);

  return (
    <div className={s.toast}>
      <div className={s.svg}>
        { mode === 'green' ? <ToastGreenIcon /> : null}
        { mode === 'yellow' ? <ToastYellowIcon /> : null }
        { mode === 'red' ? <ToastRedIcon /> : null }
        { mode === 'loading' ? <div className={s.icon_loading}><ToastLoadingIcon /></div> : null }
        { mode === 'finish' ? <ToastGreenIcon /> : null}
      </div>
      <div className={s.body}>
        {children}
      </div>
      {
        mode !== 'loading'
          ? (
            <button
              className={s.button}
              type="button"
              onClick={() => {
                onDelete();
              }}
            >
              <ToastButtonIcon />
            </button>
          )
          : null
      }

    </div>
  );
};

export default Toast;
