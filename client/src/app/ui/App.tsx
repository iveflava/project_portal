import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRouter from '../providers/Router/Router';
import '../styles/index.scss';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import Toaster from '@/features/Toaster/ui/Toaster';
import Loader from '@/shared/ui/Loader/Loader';
import { fetchAuthTokenVerifyAsyncThunk, fetchProfileAsyncThunk } from '../model/GlobalAsyncThunk';
import { selectGlobalStatePending } from '../model/GlobalSelectors';

axios.defaults.baseURL = 'http://95.214.62.135:3000';

const App = () => {
  const navigate = useNavigate();
  const redirect = (url: string) => {
    navigate(url);
  };
  const dispatch = useAppDispatch();

  const pending = useAppSelector(selectGlobalStatePending);

  const loading = async () => {
    await dispatch(fetchAuthTokenVerifyAsyncThunk({ redirect }));
    await dispatch(fetchProfileAsyncThunk({ redirect }));
  };

  useEffect(() => {
    loading();
  }, []);

  return (
    <>
      {
        pending
          ? <Loader />
          : <AppRouter />
      }
      <Toaster />
    </>
  );
};

export default App;
