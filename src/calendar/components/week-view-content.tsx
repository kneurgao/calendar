import React, { useEffect, useState } from 'react';

import { Grid, Typography, Paper } from '@mui/material';

import CalendarUtils from '../services/calendar-utils';
import WeekViewConstants from '../constants/week-view-constants';
import { EventElement } from '../models/event-element';
import { CalendarEvent } from '../models/calendar-event';

const WeekViewContent: React.FC<{
  week: Date[];
  events: CalendarEvent[];
}> = ({ week, events }) => {
  const [dateWiseEventElements, setDateWiseEventElements] =
    useState<Map<string, EventElement[]>>();
  const [currentTimeline, setCurrentTimeline] = useState<number>(0);

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
      setCurrentTimeline((40 / 60) * minutesSinceMidnight - 1);
    };
    updateCurrentTimeline();
    const minuteTimer = setInterval(updateCurrentTimeline, 1000 * 60);
    return () => {
      clearInterval(minuteTimer);
    };
  }, []);

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
      {week.map((weekday) => {
        return (
          <Grid
            key={weekday.getDay()}
            item
            xs={WeekViewConstants.dayColumnWidth}
            sx={{ borderRight: '1px solid lightgray' }}
          >
            {CalendarUtils.isToday(weekday) && (
              <Paper
                elevation={0}
                sx={{
                  bgcolor: '#ea4335',
                  position: 'absolute',
                  zIndex: 2,
                  width: '11%',
                  height: '2px',
                  marginLeft: '2px',
                  marginTop: currentTimeline + 'px',
                }}
              ></Paper>
            )}
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
