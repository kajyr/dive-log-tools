import { format } from 'date-fns';

function lpad(str: string, pad: string, length: number) {
  while (str.length < length) {
    str = pad + str;
  }
  return str;
}

export const datetime = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
export const time = (date: Date) => format(date, 'HH:mm:ss');

// array of [hours, minutes, seconds]
export const timeFromValues = (values: number[]) => values.map((val) => lpad(val.toString(), '0', 2)).join(':');
