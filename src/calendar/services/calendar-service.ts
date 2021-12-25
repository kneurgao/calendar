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
  return new Date(date.setDate(date.getDate() - 7));
};

const getFirstDayOfNextWeek = (date: Date) => {
  return new Date(date.setDate(date.getDate() + 7));
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

const CalendarService = {
  getFirstDayOfWeek,
  getFirstDayOfPrevWeek,
  getFirstDayOfNextWeek,
  getMonthYearByDate,
  getMonthName,
  getWeekday,
  getWeekByFirstDay,
  getToday,
  isToday,
};

export default CalendarService;
