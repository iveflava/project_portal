import { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './MemberCard.module.scss';
import DefaultAvatar from '@/shared/assets/images/defaultAvatar.png';
import Badge from '@/shared/ui/Badge/Badge';
import { AppRoutes, RoutePath } from '@/app/providers/Router/routes';

type TypeMemberCardProps = {
    _id: string,
    avatarSrc: string,
    firstName: string,
    secondName: string,
    role: string,
    city: string,
    country: string,
};

const MemberCard: FC<TypeMemberCardProps> = ({
  _id, avatarSrc, firstName, secondName, role, city, country,
}) => (
  <Link
    to={RoutePath[AppRoutes.PROFILE_ID].replace(':id', _id)}
    className={s.wrapper}
  >
    <img
      src={avatarSrc || DefaultAvatar}
      alt="avatar"
      className={s.avatar}
    />
    <div className={s.name}>
      {
        !firstName && !secondName
          ? 'Анонимный сотрудник'
          : `${firstName} ${secondName ? ` ${secondName}` : secondName}`
      }
    </div>
    {
      country || city
        ? <div className={s.place}>{`${country}${city ? `, ${city}` : city}`}</div>
        : null
    }
    {
      role
        ? <Badge mode="purple" text={role} />
        : null
    }
  </Link>
);

export default MemberCard;
