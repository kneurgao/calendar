import CalendarUtils from './calendar-utils';
import { IndexedCalendarEvent } from '../../events/db/calendar-db';
import { EventElement } from '../models/event-element';

const groupByDate = (events: IndexedCalendarEvent[]) => {
  return events.reduce<Map<number, EventElement[]>>((map, event) => {
    const eventDate = new Date(event.startTime).getDate();
    let existingEventElements = map.get(eventDate);
    if (!existingEventElements) {
      existingEventElements = [];
      map.set(eventDate, existingEventElements);
    }
    existingEventElements.push(getEventElement(event));
    return map;
  }, new Map<number, EventElement[]>());
};

const getEventElement = (event: IndexedCalendarEvent) => {
  const durationInMins = CalendarUtils.getDiffInMinutes(
    new Date(event.startTime),
    new Date(event.endTime)
  );
  const timeSinceMidnight = CalendarUtils.getMinutesSinceMidnight(
    new Date(event.startTime)
  );

  const textStyle =
    durationInMins > 15
      ? {
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 1.5,
        }
      : {
          fontSize: 10,
          fontWeight: 400,
          lineHeight: 1.1,
        };
  return {
    title: event.title,
    time:
      CalendarUtils.getTime(new Date(event.startTime)) +
      ' - ' +
      CalendarUtils.getTime(new Date(event.endTime)),
    elevation: event.level > 1 ? 3 : 1,
    style: {
      width: !event.overlapCount ? 135 : 100 - (event.level - 1) * 15,
      height: Math.max((40 / 60) * durationInMins, 10),
      marginLeft: (event.level - 1) * 5,
      marginTop: (5 / 60) * timeSinceMidnight,
    },
    textStyle,
  } as EventElement;
};

const EventUtils = {
  groupByDate,
};

export default EventUtils;
