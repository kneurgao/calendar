import { CalendarEvent } from './../calendar/models/calendar-event';
import CalendarService from '../calendar/services/calendar-service';
import { calendarDb } from '../common/db/calendar-db';
import allEvents from './data/events';

const getAll = async (firstDayOfWeek: Date) => {
  let events = await calendarDb.events.toArray();
  if (!events || events.length === 0) {
    storeEvents(allEvents);
    events = allEvents;
  }
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

const storeEvents = async (events: CalendarEvent[]) => {
  await calendarDb.events.bulkAdd(events);
};

const EventService = {
  getAll,
};

export default EventService;
