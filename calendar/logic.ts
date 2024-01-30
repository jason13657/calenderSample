import { CalendarDate } from "./type";

export const getMonthDates = (year: number, month: number): CalendarDate[] => {
  const dates: CalendarDate[] = [];
  const startDate = new Date(year, month);
  startDate.setDate(startDate.getDate() + 1);
  const endDate = new Date(year, month + 1);

  while (startDate <= endDate) {
    const date: CalendarDate = {
      date: startDate.toISOString().split("T")[0],
      isDot: false,
      isCurrent: true,
    };
    dates.push(date);
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
};

export const setEmptyDates = (dates: CalendarDate[]): CalendarDate[] => {
  if (dates === undefined) {
    return dates;
  }

  let newDates: CalendarDate[] = dates;

  const firstDay = new Date(dates[0].date).getDay();
  for (let i = 1; i <= firstDay; i++) {
    const firstDate = new Date(dates[0].date);
    firstDate.setDate(firstDate.getDate() - i);
    const newDate: CalendarDate = {
      date: firstDate.toISOString().split("T")[0],
      isDot: false,
      isCurrent: false,
    };
    newDates = [newDate, ...newDates];
  }

  const lastDay = new Date(dates[dates.length - 1].date).getDay();

  for (let i = 0 + 1; i < 7 - lastDay; i++) {
    const lastDate = new Date(dates[dates.length - 1].date);
    lastDate.setDate(lastDate.getDate() + i);
    const newDate: CalendarDate = {
      date: lastDate.toISOString().split("T")[0],
      isDot: false,
      isCurrent: false,
    };
    newDates = [...newDates, newDate];
  }

  return newDates;
};

export const getCalendarDates = (year: number, month: number): CalendarDate[] => {
  return setEmptyDates(getMonthDates(year, month));
};

export const getWeeklyDates = (dates: CalendarDate[]) => {
  const weeks: CalendarDate[][] = [];
  let week: CalendarDate[] = [];

  dates.forEach((date, index) => {
    week.push(date);
    if ((index + 1) % 7 === 0) {
      weeks.push(week);
      week = [];
    }
  });

  return weeks;
};
