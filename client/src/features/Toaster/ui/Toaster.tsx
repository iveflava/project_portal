import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { selectToasterState } from '../model/ToasterSelectors';
import { removeToast, TypeToast } from '../model/ToasterSlice';
import s from './Toaster.module.scss';
import Toast from './Toast';

const Toaster = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(selectToasterState);
  return (
    <div className={s.container}>
      {toasts.map((toast: TypeToast) => (
        <Toast
          key={toast.id}
          mode={toast.type}
          onDelete={() => dispatch(removeToast(toast.id))}
        >
          {toast.message}
        </Toast>
      ))}
    </div>
  );
};

export default Toaster;
