import React, { useEffect, useState } from 'react';

import { Box, Divider, Grid, Paper, Typography } from '@mui/material';

import CalendarUtils from '../services/calendar-utils';
import { CalendarEvent } from '../models/calendar-event';
import { EventElement } from '../models/event-element';

const WeekView: React.FC<{ firstDayOfWeek: Date; events: CalendarEvent[] }> = ({
  firstDayOfWeek,
  events,
}) => {
  const [week, setWeek] = useState<Date[]>([]);
  const [dateWiseEventElements, setDateWiseEventElements] =
    useState<Map<string, EventElement[]>>();
  const [currentTimeline, setCurrentTimeline] = useState<number>();

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
      <Grid
        container
        columns={75}
        sx={{ position: 'sticky', background: '#fff', top: 64, marginTop: 8, zIndex: 3, overflow: 'hidden' }}
      >
        <Grid item xs={5} sx={{ borderRight: '1px solid lightgray' }}></Grid>
        {week.map((weekday) => {
          return (
            <Grid
              key={weekday.getDay()}
              item
              xs={10}
              sx={{
                borderBottom: '1px solid lightgray',
                borderRight: '1px solid lightgray',
              }}
            >
              <Typography
                component={'div'}
                sx={{
                  margin: '10px 0',
                  fontSize: 12,
                  textAlign: 'center',
                  color: 'gray',
                }}
              >
                {CalendarUtils.getWeekday(weekday)}
              </Typography>
              <Box
                component="h4"
                sx={{
                  bgcolor: CalendarUtils.isToday(weekday)
                    ? 'primary.main'
                    : '',
                  width: 40,
                  height: 40,
                  lineHeight: '40px',
                  textAlign: 'center',
                  borderRadius: '50%',
                  margin: '10px auto',
                  color: CalendarUtils.isToday(weekday) ? '#fff' : '',
                }}
              >
                {weekday.getDate()}
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Grid container columns={75}>
        <Grid item xs={5} sx={{ borderRight: '1px solid lightgray' }}>
          <Paper sx={{ height: 10 }} elevation={0}></Paper>
          {CalendarUtils.getHours().map((hour) => {
            return (
              <Divider key={hour} textAlign="left" style={{ marginTop: 18 }}>
                <Typography
                  component={'span'}
                  sx={{ fontSize: 12, color: 'gray' }}
                >
                  {hour}
                </Typography>
              </Divider>
            );
          })}
        </Grid>
        {week.map((weekday) => {
          return (
            <Grid
              key={weekday.getDay()}
              item
              xs={10}
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

              {CalendarUtils.getHours().map((hour) => {
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
      </Grid>
    </>
  );
};

export default WeekView;
