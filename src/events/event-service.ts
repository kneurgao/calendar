import CalendarService from '../calendar/services/calendar-service';
import events from './data/events';

const getAll = (firstDayOfWeek: Date) => {
  const filteredEvents = events.filter((e) =>
    matchCurrentWeek(firstDayOfWeek, new Date(e.startTime), new Date(e.endTime))
  );
  return Promise.resolve(filteredEvents);
};

const matchCurrentWeek = (
  firstDayOfWeek: Date,
  startTime: Date,
  endTime: Date
) => {
  const firstDayOfNextWeek =
    CalendarService.getFirstDayOfNextWeek(firstDayOfWeek);
  return (
    (startTime >= firstDayOfWeek && startTime < firstDayOfNextWeek) ||
    (endTime >= firstDayOfWeek && endTime < firstDayOfNextWeek)
  );
};

const EventService = {
  getAll,
};

export default EventService;
