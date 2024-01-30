import { CalendarDate } from "./type";

export const getCalendarDates = (year: number, _month: number): CalendarDate[][] => {
  const month = _month + 1;

  const dates: CalendarDate[] = [];
  const lastDate = new Date(year, month, 0);
  const firstDate = new Date(year, month - 1);
  const monthStr = month < 10 ? `0${month}` : `${month}`;

  let finalDate = 0;

  for (let i = 1; i < lastDate.getDate() + 1; i++) {
    const str = `${year}-${monthStr}-${i}`;
    const date: CalendarDate = {
      date: str,
      isCurrent: true,
    };
    dates.push(date);
  }

  const lastday = lastDate.getDay();

  const nextMonthStr = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;

  for (let i = 1; i < 7 - lastday; i++) {
    const str = `${year}-${nextMonthStr}-${i}`;
    const date: CalendarDate = {
      date: str,
      isCurrent: false,
    };
    if (i === 6 - lastday) {
      finalDate = i;
    }
    dates.push(date);
  }

  const lastMonthStr = month - 1 === 0 ? `12` : month - 1 < 10 ? `0${month - 1}` : `${month - 1}`;

  const firstDay = firstDate.getDay();
  const lastMonthDate = new Date(year, month - 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const str = `${year}-${lastMonthStr}-${lastMonthDate - i}`;
    const date: CalendarDate = {
      date: str,
      isCurrent: false,
    };

    dates.unshift(date);
  }

  const weeks: CalendarDate[][] = [];
  let week: CalendarDate[] = [];

  if (dates.length / 7 === 5) {
    for (let i = 1; i <= 7; i++) {
      const str = `${year}-${nextMonthStr}-${finalDate + i}`;
      const date: CalendarDate = {
        date: str,
        isCurrent: false,
      };
      dates.push(date);
    }
  }

  dates.forEach((date, index) => {
    week.push(date);
    if ((index + 1) % 7 === 0) {
      weeks.push(week);
      week = [];
    }
  });

  return weeks;
};
