import {useTranslation} from 'react-i18next';

const relativeTimePeriods = [
  [31536000, 'year'],
  [2419200, 'month'],
  [604800, 'week'],
  [86400, 'day'],
  [3600, 'hour'],
  [60, 'minute'],
  [1, 'second'],
];

export const timeAgo = (date: Date) => {
  const {t} = useTranslation();

  if (!(date instanceof Date)) {
    date = new Date(date * 1000);
  }

  const seconds = (new Date().valueOf() - new Date(date).valueOf()) / 1000;
  for (let [secondsPer, name] of relativeTimePeriods) {
    if (seconds >= secondsPer) {
      const amount = Math.floor(seconds / +secondsPer);
      return t('ago') + ' ' + amount + ' ' + t(`${name}`);
    }
  }
  return 'Just now';
};
