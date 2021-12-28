import _ from 'lodash';

const getFirstDayOfWeek = (date?: Date) => {
  const firstDayOfWeek = date ? new Date(date) : new Date();
  return new Date(
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay())
  );
};

const getLastDayOfWeek = (date?: Date) => {
  const lastDayOfWeek = date ? new Date(date) : new Date();
  return new Date(
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() - lastDayOfWeek.getDay() + 6)
  );
};

const getFirstDayOfPrevWeek = (date: Date) => {
  const firstDayOfPrevWeek = new Date(date);
  return new Date(firstDayOfPrevWeek.setDate(firstDayOfPrevWeek.getDate() - 7));
};

const getFirstDayOfNextWeek = (date: Date) => {
  const firstDayOfNextWeek = new Date(date);
  return new Date(firstDayOfNextWeek.setDate(firstDayOfNextWeek.getDate() + 7));
};

const getMonthYearByDate = (date: Date) => {
  return date.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });
};

const getMonthName = (firstDayOfWeek: Date) => {
  const lastDayOfWeek = getLastDayOfWeek(firstDayOfWeek);
  let monthName = getMonthYearByDate(firstDayOfWeek);
  if (firstDayOfWeek.getMonth() !== lastDayOfWeek.getMonth()) {
    monthName += ' - ' + getMonthYearByDate(lastDayOfWeek);
  }
  return monthName;
};

const getWeekday = (date: Date) => {
  return date
    .toLocaleString('default', { weekday: 'short' })
    .toLocaleUpperCase();
};

const getWeekByFirstDay = (firstDayOfWeek: Date) => {
  return _.times(7).map((value) => {
    let date = new Date(firstDayOfWeek);
    date.setDate(date.getDate() + value);
    return date;
  });
};

const getToday = () => {
  return new Date().toLocaleDateString('default', { dateStyle: 'full' });
};

const isToday = (date: Date) => {
  return _.isEqual(date.toDateString(), new Date().toDateString());
};

const getMinutesSinceMidnight = (currentDate: Date = new Date()) => {
  return (
    (currentDate.getTime() - new Date(currentDate.toDateString()).getTime()) /
    1000 /
    60
  );
};

const getHours = () => {
  let date = new Date();
  return _.times(24).map((value) => {
    date.setHours(value + 1);
    return date.toLocaleTimeString('default', {
      hour12: true,
      hour: 'numeric',
    });
  });
};

const CalendarUtils = {
  getFirstDayOfWeek,
  getLastDayOfWeek,
  getFirstDayOfPrevWeek,
  getFirstDayOfNextWeek,
  getMonthYearByDate,
  getMonthName,
  getWeekday,
  getWeekByFirstDay,
  getToday,
  isToday,
  getMinutesSinceMidnight,
  getHours,
};

export default CalendarUtils;
