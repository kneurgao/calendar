import React, { useContext, useEffect, useState } from 'react';

import { Typography, Paper } from '@mui/material';

import CalendarUtils from '../services/calendar-utils';
import { EventElement } from '../models/event-element';
import { CalendarEvent } from '../models/calendar-event';
import EventsContext from '../contexts/events-context';

const WeekViewEvents: React.FC<{
  weekday: Date;
}> = ({ weekday }) => {
  const { events } = useContext(EventsContext);
  const [dateWiseEventElements, setDateWiseEventElements] =
    useState<Map<string, EventElement[]>>();

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

  const getEventElement = (event: CalendarEvent): EventElement => {
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
      {dateWiseEventElements
        ?.get(weekday.toDateString())
        ?.map((eventElement, index) => {
          return (
            <Paper
              key={index}
              elevation={1}
              sx={{
                color: '#fff',
                bgcolor: '#039be5',
                position: 'absolute',
                marginBottom: '2px',
                ...eventElement.style,
              }}
            >
              <Typography
                component={'h6'}
                sx={{
                  padding: '0 4px',
                  ...eventElement.textStyle,
                }}
              >
                {eventElement.title}
              </Typography>
            </Paper>
          );
        })}
    </>
  );
};

export default WeekViewEvents;
