export const dateToUtc = (date: Date): Date => {
  let now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );

  return new Date(now_utc);
};

export const dateToIso = (date: Date): Date => {
  const utcDate = dateToUtc(date);
  const tzo = -utcDate.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num: number) {
      return (num < 10 ? '0' : '') + num;
    };

  const isoString =
    utcDate.getFullYear() +
    '-' +
    pad(utcDate.getMonth() + 1) +
    '-' +
    pad(utcDate.getDate()) +
    'T' +
    pad(utcDate.getHours()) +
    ':' +
    pad(utcDate.getMinutes()) +
    ':' +
    pad(utcDate.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' +
    pad(Math.abs(tzo) % 60);

  return new Date(isoString);
};

export function UTCToLocale(date: Date): Date {
  let newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return newDate;
}
