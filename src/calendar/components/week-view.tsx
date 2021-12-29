import React, { useEffect, useState } from 'react';

import CalendarUtils from '../services/calendar-utils';
import { CalendarEvent } from '../models/calendar-event';
import { EventElement } from '../models/event-element';
import WeekViewHeader from './week-view-header';
import WeekViewBody from './week-view-body';

const WeekView: React.FC<{ firstDayOfWeek: Date; events: CalendarEvent[] }> = ({
  firstDayOfWeek,
  events,
}) => {
  const [week, setWeek] = useState<Date[]>([]);
  const [dateWiseEventElements, setDateWiseEventElements] =
    useState<Map<string, EventElement[]>>();
  const [currentTimeline, setCurrentTimeline] = useState<number>(0);

  useEffect(() => {
    setWeek(CalendarUtils.getWeekByFirstDay(firstDayOfWeek));
  }, [firstDayOfWeek]);

  useEffect(() => {
    const eventElementMap = new Map<string, EventElement[]>();
    events.forEach((event) => {
      const eventDate = new Date(event.startTime).toDateString();
      let existingEventElements = eventElementMap.get(eventDate);
      if (!existingEventElements) {
        existingEventElements = [];
        eventElementMap.set(eventDate, existingEventElements);
      }
      existingEventElements.push(getEventElement(event));
    });
    setDateWiseEventElements(eventElementMap);
  }, [events]);

  useEffect(() => {
    const updateCurrentTimeline = () => {
      const minutesSinceMidnight = CalendarUtils.getMinutesSinceMidnight();
      setCurrentTimeline(40 / 60 * minutesSinceMidnight - 1);
    };
    updateCurrentTimeline();
    const minuteTimer = setInterval(updateCurrentTimeline, 1000 * 60);
    return () => {
      clearInterval(minuteTimer);
    };
  }, []);

  const getEventElement = (
    event: CalendarEvent
  ): EventElement => {
    const durationInMins =
      (new Date(event.endTime).getTime() -
        new Date(event.startTime).getTime()) /
      1000 /
      60;
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
      style: {
        width: '135px',
        height: Math.max((40 / 60) * durationInMins, 10),
        marginTop: (40 / 60) * timeSinceMidnight + 'px',
      },
      textStyle,
    } as EventElement;
  };

  return (
    <>
      <WeekViewHeader week={week}></WeekViewHeader>
      <WeekViewBody week={week} dateWiseEventElements={dateWiseEventElements} currentTimeline={currentTimeline}></WeekViewBody>
    </>
  );
};

export default WeekView;
