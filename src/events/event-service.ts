import CalendarDbService from './db/calendar-db-service';
import CalendarUtils from '../calendar/services/calendar-utils';
import { CalendarEvent } from './../calendar/models/calendar-event';
import allEvents from './data/events';

const getAll = async (firstDayOfWeek: Date) => {
  let events = await CalendarDbService.loadEvents();
  if (!events || events.length === 0) {
    CalendarDbService.storeEvents(allEvents);
    events = allEvents;
  }
  const filteredEvents = filterEvents(events, firstDayOfWeek);
  return Promise.resolve(filteredEvents);
};

const filterEvents = (events: CalendarEvent[], firstDayOfWeek: Date) => {
  const firstDayOfNextWeek =
    CalendarUtils.getFirstDayOfNextWeek(firstDayOfWeek);

  return events.filter((event) => {
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);
    return (
      (startTime >= firstDayOfWeek && startTime < firstDayOfNextWeek) ||
      (endTime >= firstDayOfWeek && endTime < firstDayOfNextWeek)
    );
  });
};

const EventService = {
  getAll,
};

export default EventService;
