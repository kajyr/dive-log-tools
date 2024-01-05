import { time } from '../formats';
import dayjs from 'dayjs';

export function diveExitTime(entryDate: string | Date, diveDurationInMinutes: number) {
  const entry = dayjs(entryDate);
  const exitDate = entry.add(diveDurationInMinutes, 'minute');
  return time(exitDate);
}
