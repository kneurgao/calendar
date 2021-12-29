import axios from 'axios';
import moment from 'moment';

import CalendarDbService from './db/calendar-db-service';
import CalendarUtils from '../calendar/services/calendar-utils';
import { CalendarEvent } from './../calendar/models/calendar-event';

const apiUrl = 'events.json';

const getAll = async (firstDayOfWeek: Date) => {
  // Load events from database
  let events = await CalendarDbService.loadEvents();

  // If empty then fetch from API and store into database
  if (!events || events.length === 0) {
    const eventsResponse = await axios.get<CalendarEvent[]>(apiUrl);
    CalendarDbService.storeEvents(eventsResponse.data);
    events = eventsResponse.data;
  }

  // Filter events for current week (ideally should be done by API)
  const filteredEvents = filterEvents(events, firstDayOfWeek);

  // Sort events
  sort(filteredEvents);

  // Check for conflicting events
  checkConflicts(filteredEvents);

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

const sort = (events: CalendarEvent[]) => {
  events.sort(
    (a: CalendarEvent, b: CalendarEvent) =>
      new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf() ||
      new Date(a.endTime).valueOf() - new Date(b.endTime).valueOf()
  );
};

const checkConflicts = (events: CalendarEvent[]) => {
  events.forEach((event) => {
    event.level = 1;
    event.overlapCount = 0;
    for (const oEvent of events) {
      if (!oEvent.level) {
        break;
      }
      if (
        moment(event.startTime).isBetween(
          moment(oEvent.startTime),
          moment(oEvent.endTime)
        ) &&
        oEvent.level >= event.level
      ) {
        event.level = oEvent.level + 1;
        event.overlapCount++;
        oEvent.overlapCount++;
      }
    }
  });
  console.log(events);
};

const EventService = {
  getAll,
};

export default EventService;
