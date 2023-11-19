import {add, previousMonday, sub, nextSunday} from 'date-fns';
import {Recurrence} from '../types/recurrence';

export const calculateRange = (period: Recurrence, periodIndex: number) => {
  const now = new Date();
  let start: Date = new Date();
  let end: Date = new Date();

  switch (period) {
    case Recurrence.Daily:
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      end = add(start, {
        hours: 23,
        minutes: 59,
        seconds: 59,
      });
      break;
    case Recurrence.Weekly:
      const firstDayOfThisWeek = previousMonday(now);
      const daysToSubtract = periodIndex * 7;
      start = sub(firstDayOfThisWeek, {days: daysToSubtract});
      end = nextSunday(start);
      break;
    case Recurrence.Monthly:
      start = new Date(now.getFullYear(), now.getMonth() - periodIndex, 1);
      end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
      break;
    case Recurrence.Yearly:
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31);
      break;
  }

  return {
    start,
    end,
  };
};
