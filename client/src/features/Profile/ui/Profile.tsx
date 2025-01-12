import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '@/shared/ui/Button/Button';
import s from './Profile.module.scss';
import DefaultAvatar from '@/shared/assets/images/defaultAvatar.png';
import MailIcon from '@/shared/assets/images/icons/mail.svg';
import InstagramIcon from '@/shared/assets/images/icons/instagram.svg';
import TelegramIcon from '@/shared/assets/images/icons/telegram.svg';
import Badge from '@/shared/ui/Badge/Badge';
import { selectGlobalStateUserId } from '@/app/model/GlobalSelectors';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchGetFullProfileAsyncThunk } from '../model/ProfileAsyncThunk';
import {
  selectProfileStateAboutUser, selectProfileStateAvatarSrc, selectProfileStateBirthday, selectProfileStateBooks, selectProfileStateCity,
  selectProfileStateCountry, selectProfileStateFirstName, selectProfileStateHardwareAndSoftware, selectProfileStateInstagram,
  selectProfileStateMail, selectProfileStateRole, selectProfileStateSecondName,
  selectProfileStateTelegram,
} from '../model/ProfileSelectors';
import { AppRoutes, RoutePath } from '@/app/providers/Router/routes';

const Profile = () => {
  const navigate = useNavigate();
  const redirect = (url: string) => {
    navigate(url);
  };
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const userId = useAppSelector(selectGlobalStateUserId);
  const firstName = useAppSelector(selectProfileStateFirstName);
  const secondName = useAppSelector(selectProfileStateSecondName);
  const role = useAppSelector(selectProfileStateRole);
  const city = useAppSelector(selectProfileStateCity);
  const country = useAppSelector(selectProfileStateCountry);
  const aboutUser = useAppSelector(selectProfileStateAboutUser);
  const instagram = useAppSelector(selectProfileStateInstagram);
  const mail = useAppSelector(selectProfileStateMail);
  const telegram = useAppSelector(selectProfileStateTelegram);
  const birthday = useAppSelector(selectProfileStateBirthday);
  const hardwareAndSoftware = useAppSelector(selectProfileStateHardwareAndSoftware);
  const books = useAppSelector(selectProfileStateBooks);
  const avatarSrc = useAppSelector(selectProfileStateAvatarSrc);

  const redirectToEditProfile = () => redirect(RoutePath[AppRoutes.EDIT_PROFILE_ID].replace(':id', userId));

  useEffect(() => {
    dispatch(fetchGetFullProfileAsyncThunk({ id, redirect }));
  }, [id]);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <img
          src={avatarSrc || DefaultAvatar}
          alt="Аватар"
          className={s.avatar}
        />
        <div className={s.container}>
          <div className={s.top}>
            <div className={s.user}>
              <div className={s.name}>
                {
                  !firstName && !secondName
                    ? 'Анонимный сотрудник'
                    : `${firstName}${secondName ? ` ${secondName}` : secondName}`
                }
              </div>
              {
                country || city
                  ? <div className={s.place}>{`${country}${city ? `, ${city}` : city}`}</div>
                  : <div className={s.place}>Информации о месте проживания нет</div>
              }
              {
                role
                  ? <Badge mode="purple" text={role} />
                  : null
              }
            </div>
            <div className={s.options}>
              {
                userId === id
                  ? (
                    <Button
                      mode="purple"
                      onClick={redirectToEditProfile}
                    >
                      Редактировать
                    </Button>
                  )
                  : null
              }
            </div>
          </div>

          <div className={s.bottom}>
            <div className={s.item}>
              <div className={s.description}>Дата рождения</div>
              <div className={s.text}>{birthday || 'Пользователь пока что не поделился датой рождения'}</div>
            </div>

            <div className={s.item}>
              <div className={s.description}>О себе</div>
              <div className={s.text}>{aboutUser || 'Пользователь пока что не рассказал о себе' }</div>
            </div>
            {
              telegram || mail || instagram
                ? (
                  <div className={s.accounts}>
                    {
                      mail
                        ? (
                          <div className={s.account}>
                            <MailIcon />
                            {mail}
                          </div>
                        )
                        : null
                    }
                    {
                      instagram
                        ? (
                          <div className={s.account}>
                            <InstagramIcon />
                            {instagram}
                          </div>
                        )
                        : null
                    }
                    {
                      telegram
                        ? (
                          <div className={s.account}>
                            <TelegramIcon />
                            {telegram}
                          </div>
                        )
                        : null
                    }

                  </div>
                )
                : null
            }
          </div>

        </div>

      </div>
      <div className={s.body}>
        <div className={s.item}>
          <div className={s.heading}>Моя техника и ПО</div>
          <div className={s.text}>
            {
              hardwareAndSoftware || 'Информация не предоставлена'
            }
          </div>
        </div>
        <div className={s.item}>
          <div className={s.heading}>Мои книги</div>
          <div className={s.text}>
            {
              books || 'Информация не предоставлена'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
