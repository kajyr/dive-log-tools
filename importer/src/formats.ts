import dayjs, { Dayjs } from 'dayjs';

function lpad(str: string, pad: string, length: number) {
  while (str.length < length) {
    str = pad + str;
  }
  return str;
}

export const datetime = (date: Date) => dayjs(date).format('YYYY-MM-DDTHH:mm:ss[Z]');
export const time = (date: Date | Dayjs) => dayjs(date).format('HH:mm:ss');

// array of [hours, minutes, seconds]
export const timeFromValues = (values: number[]) => values.map((val) => lpad(val.toString(), '0', 2)).join(':');
