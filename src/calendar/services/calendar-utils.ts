import moment from 'moment';
import _ from 'lodash';

const getFirstDayOfWeek = (date?: Date) => {
  return moment(date).startOf('week').toDate();
};

const getLastDayOfWeek = (date?: Date) => {
  return moment(date).endOf('week').startOf('day').toDate();
};

const getFirstDayOfPrevWeek = (date: Date) => {
  return moment(date).subtract(1, 'weeks').startOf('week').toDate();
};

const getFirstDayOfNextWeek = (date: Date) => {
  return moment(date).add(1, 'weeks').startOf('week').toDate();
};

const getMonthName = (firstDayOfWeek: Date) => {
  let monthName = moment(firstDayOfWeek).format('MMMM YYYY');
  const lastDayOfWeek = getLastDayOfWeek(firstDayOfWeek);
  if (firstDayOfWeek.getMonth() !== lastDayOfWeek.getMonth()) {
    monthName += ' - ' + moment(lastDayOfWeek).format('MMMM YYYY');
  }
  return monthName;
};

const getWeekday = (date: Date) => {
  return moment(date).format('ddd');
};

const getWeekByFirstDay = (firstDayOfWeek: Date) => {
  return _.times(7).map((value) => {
    return moment(firstDayOfWeek).clone().add(value, 'days').toDate();
  });
};

const getToday = () => {
  return moment().format('dddd, MMMM D, YYYY');
};

const isToday = (date: Date) => {
  return moment(date).isSame(moment(), 'day');
};

const getDiffInMinutes = (startTime: Date, endTime: Date) => {
  const r = moment(endTime).diff(moment(startTime), 'minutes');
  return r;
};

const getMinutesSinceMidnight = (currentDate?: Date) => {
  const today = moment(currentDate);
  return today.diff(today.clone().startOf('day'), 'minutes');
};

const get24HourSlots = () => {
  let today = moment().startOf('day');
  return _.times(24).map((value) => {
    return moment(today).clone().add(value + 1, 'hours').format('h A');
  });
};

const getTime = (date: Date) => {
  return moment(date).format('h:mm A');
};

const CalendarUtils = {
  getFirstDayOfWeek,
  getLastDayOfWeek,
  getFirstDayOfPrevWeek,
  getFirstDayOfNextWeek,
  getMonthName,
  getWeekday,
  getWeekByFirstDay,
  getToday,
  isToday,
  getDiffInMinutes,
  getMinutesSinceMidnight,
  get24HourSlots,
  getTime,
};

export default CalendarUtils;
