import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import s from './Teams.module.scss';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchGetTeamsAsyncThunk, fetchJoinTeamAsyncThunk } from '../model/TeamsAsyncThunk';
import { selectTeamsStateTeams } from '../model/TeamsSelectors';
import { TypeTeam } from '../types';
import { MemberCard } from '@/entities/MemberCard';
import Button from '@/shared/ui/Button/Button';
import { selectGlobalStateUserId } from '@/app/model/GlobalSelectors';

const Teams = () => {
  const navigate = useNavigate();
  const redirect = (url: string) => {
    navigate(url);
  };
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectGlobalStateUserId);
  const teams = useAppSelector(selectTeamsStateTeams);

  const memberOfTeam = useMemo(
    () => teams.some((team) => team.members.some((member) => member._id === userId)),
    [teams],
  );

  const joinTeam = (id: string) => {
    dispatch(fetchJoinTeamAsyncThunk({ id, redirect }));
  };

  useEffect(() => {
    dispatch(fetchGetTeamsAsyncThunk({ redirect }));
  }, []);

  return (
    <div className={s.wrapper}>
      {
        teams?.length
          ? teams?.map((team: TypeTeam) => (
            <div
              key={team._id}
              className={s.team}
            >
              <div className={s.header}>
                <div className={s.name_container}>
                  <div className={s.name}>{team.name}</div>
                  <div className={s.count}>{team.members.length}</div>
                </div>
                {
                  !memberOfTeam
                    ? (
                      <Button
                        mode="purple"
                        onClick={() => joinTeam(team._id)}
                      >
                        Присоединиться
                      </Button>
                    )
                    : null
                }
              </div>
              <div className={s.list}>
                {
                  team?.members?.length
                    ? team.members.map((member) => (
                      <MemberCard
                        key={member._id + Date.now()}
                        _id={member._id}
                        avatarSrc={member.avatarSrc}
                        firstName={member.firstName}
                        secondName={member.secondName}
                        role={member.role}
                        city={member.city}
                        country={member.country}
                      />
                    ))
                    : <div className={s.empty}>Пока что никого нет</div>
                }
              </div>
            </div>
          ))
          : <div className={clsx(s.team, s.empty)}>Команд пока нет</div>
      }
    </div>
  );
};

export default Teams;
