export const getTokens = () => {
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const accessToken = localStorage.getItem('accessToken') || '';
  return { accessToken, refreshToken };
};

export const setRefreshTokenToLocaleStorage = ({ refreshToken }: {refreshToken: string}) => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const setAccessTokenToLocaleStorage = ({ accessToken }: {accessToken: string}) => {
  localStorage.setItem('accessToken', accessToken);
};

export const removeRefreshTokenToLocalStorage = () => {
  localStorage.removeItem('refreshToken');
};

export const removeAccessTokenToLocalStorage = () => {
  localStorage.removeItem('accessToken');
};

export const setSidebarCollapseToLocaleStorage = (collapse: boolean) => localStorage.setItem('sidebar-collapsed', JSON.stringify(collapse));

export const getSidebarCollapseToLocaleStorage = () => JSON.parse(localStorage.getItem('sidebar-collapsed')) || false;

export const formattedDateForNews = (date: Date) => {
  const [hours, minutes] = date.toLocaleTimeString().split(':');
  const day = date.getDay();
  let dayName: string;
  switch (day) {
  case 0: dayName = 'Воскресенье';
    break;
  case 1: dayName = 'Понедельник';
    break;
  case 2: dayName = 'Вторник';
    break;
  case 3: dayName = 'Среда';
    break;
  case 4: dayName = 'Четверг';
    break;
  case 5: dayName = 'Пятница';
    break;
  case 6: dayName = 'Суббота';
    break;
  default: dayName = '';
    break;
  }
  let month: string | number = date.getMonth();
  switch (month) {
  case 0: month = 'января';
    break;
  case 1: month = 'февраля';
    break;
  case 2: month = 'марта';
    break;
  case 3: month = 'апрель';
    break;
  case 4: month = 'май';
    break;
  case 5: month = 'июнь';
    break;
  case 6: month = 'июль';
    break;
  case 7: month = 'август';
    break;
  case 8: month = 'сентябрь';
    break;
  case 9: month = 'октябрь';
    break;
  case 10: month = 'ноябрь';
    break;
  case 11: month = 'декабрь';
    break;
  default: month = '';
    break;
  }

  return `${dayName}, ${day} ${month} ⋅ ${hours}:${minutes}`;
};
