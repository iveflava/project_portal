/* eslint-disable no-nested-ternary */
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import s from './EditProfile.module.scss';
import { selectGlobalStateUserId } from '@/app/model/GlobalSelectors';
import { AppRoutes, RoutePath } from '@/app/providers/Router/routes';
import { fetchGetFullProfileAsyncThunk } from '@/features/Profile/model/ProfileAsyncThunk';
import DefaultAvatar from '@/shared/assets/images/defaultAvatar.png';
import Button from '@/shared/ui/Button/Button';
import InputContainer from '@/shared/ui/InputContainer/InputContainer';
import Input from '@/shared/ui/Input/Input';
import {
  selectEditProfileStateAboutUser, selectEditProfileStateAvatarBlob, selectEditProfileStateAvatarSrc, selectEditProfileStateBirthday, selectEditProfileStateBooks, selectEditProfileStateCity,
  selectEditProfileStateCountry, selectEditProfileStateErrorAboutUser, selectEditProfileStateErrorBirthday,
  selectEditProfileStateErrorBooks,
  selectEditProfileStateErrorCity, selectEditProfileStateErrorCountry, selectEditProfileStateErrorFirstName,
  selectEditProfileStateErrorHardwareAndSoftware,
  selectEditProfileStateErrorInstagram, selectEditProfileStateErrorMail, selectEditProfileStateErrorRole,
  selectEditProfileStateErrorSecondName, selectEditProfileStateErrorTelegram, selectEditProfileStateFirstName,
  selectEditProfileStateHardwareAndSoftware,
  selectEditProfileStateInstagram, selectEditProfileStateMail, selectEditProfileStateRole,
  selectEditProfileStateSecondName, selectEditProfileStateTelegram,
} from '../model/EditProfileSelectors';
import {
  setAboutUser,
  setAvatarBlob,
  setAvatarSrc,
  setBirthday,
  setBooks,
  setCity, setCountry, setFirstName, setHardwareAndSoftware, setInstagram, setMail, setRole, setSecondName,
  setTelegram,
} from '../model/EditProfileSlice';
import { fetchUpdateProfileAsyncThunk } from '../model/EditProfileAsyncThunk';
import Textarea from '@/shared/ui/Textarea/Textarea';
import InputDate from '@/shared/ui/InputDate/InputDate';
import { addToast } from '@/features/Toaster/model/ToasterSlice';

const EditProfile = () => {
  const navigate = useNavigate();
  const redirect = (url: string) => {
    navigate(url);
  };
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const userId = useAppSelector(selectGlobalStateUserId);
  const firstName = useAppSelector(selectEditProfileStateFirstName);
  const errorFirstName = useAppSelector(selectEditProfileStateErrorFirstName);
  const secondName = useAppSelector(selectEditProfileStateSecondName);
  const errorSecondName = useAppSelector(selectEditProfileStateErrorSecondName);
  const role = useAppSelector(selectEditProfileStateRole);
  const errorRole = useAppSelector(selectEditProfileStateErrorRole);
  const city = useAppSelector(selectEditProfileStateCity);
  const errorCity = useAppSelector(selectEditProfileStateErrorCity);
  const country = useAppSelector(selectEditProfileStateCountry);
  const errorCountry = useAppSelector(selectEditProfileStateErrorCountry);
  const aboutUser = useAppSelector(selectEditProfileStateAboutUser);
  const errorAboutUser = useAppSelector(selectEditProfileStateErrorAboutUser);
  const mail = useAppSelector(selectEditProfileStateMail);
  const errorMail = useAppSelector(selectEditProfileStateErrorMail);
  const instagram = useAppSelector(selectEditProfileStateInstagram);
  const errorInstagram = useAppSelector(selectEditProfileStateErrorInstagram);
  const telegram = useAppSelector(selectEditProfileStateTelegram);
  const errorTelegram = useAppSelector(selectEditProfileStateErrorTelegram);
  const birthday = useAppSelector(selectEditProfileStateBirthday);
  const errorBirthday = useAppSelector(selectEditProfileStateErrorBirthday);
  const hardwareAndSoftware = useAppSelector(selectEditProfileStateHardwareAndSoftware);
  const errorHardwareAndSoftware = useAppSelector(selectEditProfileStateErrorHardwareAndSoftware);
  const books = useAppSelector(selectEditProfileStateBooks);
  const errorBooks = useAppSelector(selectEditProfileStateErrorBooks);
  const avatarSrc = useAppSelector(selectEditProfileStateAvatarSrc);
  const avatarBlob = useAppSelector(selectEditProfileStateAvatarBlob);
  const avatarUploadRef = useRef(null);

  const selectAvatar = () => {
    if (avatarUploadRef.current) {
      avatarUploadRef.current.click();
    }
  };

  const avatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files.length && e.target.files.length > 1) return;
    const file = e.target.files[0];
    if (file.size > 800000) {
      dispatch(addToast({ type: 'green', message: 'Файл большого размера' }));
      return;
    }
    const url = URL.createObjectURL(file);
    dispatch(setAvatarSrc(url));
    dispatch(setAvatarBlob(file));
  };

  const removeAvatar = () => {
    dispatch(setAvatarSrc(''));
    dispatch(setAvatarBlob(null));
  };

  const updateProfile = async () => {
    const temporaryURL = avatarSrc;
    await dispatch(fetchUpdateProfileAsyncThunk({
      id,
      data: {
        firstName,
        secondName,
        role,
        city,
        country,
        aboutUser,
        birthday,
        accounts: {
          instagram,
          mail,
          telegram,
        },
        hardwareAndSoftware,
        books,
        avatarBlob: avatarSrc?.startsWith('blob:')
          ? avatarBlob
          : avatarSrc
            ? 'HAS_BEEN_UPLOAD'
            : null,
      },
      redirect,
    }));
    URL.revokeObjectURL(temporaryURL);
  };

  useEffect(() => {
    if (!userId) return;
    if (userId !== id) {
      redirect(RoutePath[AppRoutes.PROFILE_ID].replace(':id', userId));
    } else {
      dispatch(fetchGetFullProfileAsyncThunk({ id, redirect }));
    }
  }, [userId]);

  return (
    <div className={s.wrapper}>
      <div className={s.list}>
        <div className={s.item}>
          <div className={s.division}>
            <div className={s.name}>Фото профиля</div>
            <div className={s.description}>Вы можете изменить фото профиля или удалить текущее</div>
          </div>
          <div className={clsx(s.details, s.avatar_container)}>
            <img
              src={avatarSrc || DefaultAvatar}
              alt="Аватар"
              className={s.avatar}
            />
            <div className={s.upload}>
              <div className={s.heading}>Загрузить новое фото</div>
              <Button
                className={s.button_select}
                mode="gray"
                onClick={selectAvatar}
              >
                Выбрать файл
              </Button>
              <input
                style={{ display: 'none' }}
                type="file"
                ref={avatarUploadRef}
                onChange={avatarUpload}
                accept=".jpg, .jpeg, .png, .gif, .bmp"
              />
              <div className={s.description}>Максимально допустимый размер файла 800 Кб.</div>
              <Button
                className={s.button_delete}
                mode="gray"
                onClick={removeAvatar}
              >
                Удалить фото профиля
              </Button>
            </div>
          </div>
        </div>

        <div className={s.item}>
          <div className={s.division}>
            <div className={s.name}>Основные настройки</div>
            <div className={s.description}>Эта информация появится в вашем профиле.</div>
          </div>
          <div className={clsx(s.details, s.settings_container)}>
            <InputContainer
              label="Имя"
              className={s.input_container}
              error={errorFirstName}
            >
              <Input
                className={s.input}
                value={firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setFirstName(e.target.value))}
                error={errorFirstName}
              />
            </InputContainer>
            <InputContainer
              label="Фамилия"
              className={s.input_container}
              error={errorSecondName}
            >
              <Input
                className={s.input}
                value={secondName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setSecondName(e.target.value))}
                error={errorSecondName}
              />
            </InputContainer>
            <InputContainer
              label="Дата рождения"
              className={s.input_container}
              error={errorBirthday}
            >
              <InputDate
                className={s.input}
                value={birthday}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setBirthday(e.target.value))}
                error={errorBirthday}
              />
            </InputContainer>
            <InputContainer
              label="e-mail"
              className={s.input_container}
              error={errorMail}
            >
              <Input
                className={s.input}
                value={mail}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setMail(e.target.value))}
                error={errorMail}
              />
            </InputContainer>
            <InputContainer
              label="Должность"
              className={s.input_container}
              error={errorRole}
            >
              <Input
                className={s.input}
                value={role}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setRole(e.target.value))}
                error={errorRole}
              />
            </InputContainer>
            <InputContainer
              label="Страна"
              className={s.input_container}
              error={errorCountry}
            >
              <Input
                className={s.input}
                value={country}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setCountry(e.target.value))}
                error={errorCountry}
              />
            </InputContainer>
            <InputContainer
              label="Город"
              className={s.input_container}
              error={errorCity}
            >
              <Input
                className={s.input}
                value={city}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setCity(e.target.value))}
                error={errorCity}
              />
            </InputContainer>
          </div>
        </div>

        <div className={s.item}>
          <div className={s.division}>
            <div className={s.name}>О себе</div>
            <div className={s.description}>Эта информация появится в вашем профиле.</div>
          </div>
          <div className={s.details}>
            <Textarea
              value={aboutUser}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => dispatch(setAboutUser(e.target.value))}
              error={errorAboutUser}
            />
          </div>
        </div>

        <div className={s.item}>
          <div className={s.division}>
            <div className={s.name}>Социальные сети</div>
            <div className={s.description}>Эта информация появится в вашем профиле.</div>
          </div>
          <div className={clsx(s.details, s.social_container)}>
            <InputContainer
              label="Instagram"
              className={s.input_container}
              error={errorInstagram}
            >
              <Input
                className={s.input}
                value={instagram}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setInstagram(e.target.value))}
                error={errorInstagram}
              />
            </InputContainer>
            <InputContainer
              label="Telegram"
              className={s.input_container}
              error={errorTelegram}
            >
              <Input
                className={s.input}
                value={telegram}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setTelegram(e.target.value))}
                error={errorTelegram}
              />
            </InputContainer>
          </div>
        </div>

        <div className={s.item}>
          <div className={s.division}>
            <div className={s.name}>Моя техника и ПО</div>
            <div className={s.description}>Эта информация появится в вашем профиле.</div>
          </div>
          <div className={clsx(s.details, s.avatar_container)}>
            <Textarea
              value={hardwareAndSoftware}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => dispatch(setHardwareAndSoftware(e.target.value))}
              error={errorHardwareAndSoftware}
            />
          </div>
        </div>
        <div className={s.item}>
          <div className={s.division}>
            <div className={s.name}>Мои книги</div>
            <div className={s.description}>Эта информация появится в вашем профиле.</div>
          </div>
          <div className={clsx(s.details, s.avatar_container)}>
            <Textarea
              value={books}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => dispatch(setBooks(e.target.value))}
              error={errorBooks}
            />
          </div>
        </div>
      </div>

      <div className={s.footer}>
        <Button
          mode="purple"
          onClick={updateProfile}
        >
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
