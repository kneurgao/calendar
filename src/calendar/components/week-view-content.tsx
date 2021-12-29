import React, { useContext, useEffect, useState } from 'react';

import { Grid, Paper } from '@mui/material';

import WeekContext from '../contexts/week-context';
import EventsContext from '../contexts/events-context';
import WeekViewEvents from './week-view-events';
import WeekViewCurrentTimeline from './week-view-current-timeline';
import CalendarUtils from '../services/calendar-utils';
import { EventElement } from '../models/event-element';
import { IndexedCalendarEvent } from '../../events/db/calendar-db';
import WeekViewConstants from '../constants/week-view-constants';

const WeekViewContent: React.FC = () => {
  const { week } = useContext(WeekContext);
  const { events } = useContext(EventsContext);
  const [dateWiseEventElements, setDateWiseEventElements] =
    useState<Map<number, EventElement[]>>();

  useEffect(() => {
    const eventElementMap = new Map<number, EventElement[]>();
    events.forEach((event) => {
      const eventDate = new Date(event.startTime).getDate();
      let existingEventElements = eventElementMap.get(eventDate);
      if (!existingEventElements) {
        existingEventElements = [];
        eventElementMap.set(eventDate, existingEventElements);
      }
      existingEventElements.push(getEventElement(event));
    });
    setDateWiseEventElements(eventElementMap);
  }, [events]);

  const getEventElement = (event: IndexedCalendarEvent): EventElement => {
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
      {week.map((weekday) => {
        return (
          <Grid
            key={weekday.getDay()}
            item
            xs={WeekViewConstants.dayColumnWidth}
            sx={{ borderRight: '1px solid lightgray' }}
          >
            {/* Show current time line */}
            <WeekViewCurrentTimeline
              weekday={weekday}
            ></WeekViewCurrentTimeline>

            {/* List events */}
            <WeekViewEvents
              eventElements={dateWiseEventElements?.get(weekday.getDate())}
            ></WeekViewEvents>

            {/* Show hour slots for a week day */}
            {CalendarUtils.get24HourSlots().map((hour) => {
              return (
                <Paper
                  key={hour}
                  elevation={0}
                  square={true}
                  sx={{
                    lineHeight: '39px',
                    fontSize: 12,
                    borderBottom: '1px solid lightgray',
                  }}
                >
                  &nbsp;
                </Paper>
              );
            })}
          </Grid>
        );
      })}
    </>
  );
};

export default WeekViewContent;
