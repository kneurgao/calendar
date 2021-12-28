import { CalendarEvent } from './../../calendar/models/calendar-event';
import Dexie, { Table } from 'dexie';

export interface IndexedCalendarEvent extends CalendarEvent {
  id?: number;
}

export class CalendarDb extends Dexie {
  events!: Table<IndexedCalendarEvent>;

  constructor() {
    super('calendarDatabase');
    this.version(1).stores({
      events: '++id, title, startTime, endTime',
    });
  }
}

export const calendarDb = new CalendarDb();
