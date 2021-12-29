import { CalendarEvent } from '../../calendar';
import { calendarDb } from './calendar-db';

const storeEvents = async (events: CalendarEvent[]) => {
  await calendarDb.events.bulkAdd(events);
};

const loadEvents = async () => {
  return calendarDb.events.toArray();
};

const CalendarDbService = { storeEvents, loadEvents };

export default CalendarDbService;
