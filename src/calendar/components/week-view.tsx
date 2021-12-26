import React, { useEffect, useState } from 'react';

import { Box, Divider, Grid, Paper, Typography } from '@mui/material';

import CalendarService from '../services/calendar-service';
import { CalendarEvent } from '../models/calendar-event';
import { EventElement } from '../models/event-element';

const hours = [
  '1 AM',
  '2 AM',
  '3 AM',
  '4 AM',
  '5 AM',
  '6 AM',
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  '12 PM',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM',
  '7 PM',
  '8 PM',
  '9 PM',
  '10 PM',
  '11 PM',
  '12 AM',
];

const WeekView: React.FC<{ firstDayOfWeek: Date; events: CalendarEvent[] }> = ({
  firstDayOfWeek,
  events,
}) => {
  const [week, setWeek] = useState<Date[]>([]);
  const [dateWiseEventElements, setDateWiseEventElements] =
    useState<Map<string, EventElement[]>>();

  useEffect(() => {
    setWeek(CalendarService.getWeekByFirstDay(firstDayOfWeek));
  }, [firstDayOfWeek]);

  useEffect(() => {
    const eventElementMap = new Map<string, EventElement[]>();
    events.forEach((event, index) => {
      const eventDate = new Date(event.startTime).toDateString();
      let existingEventElements = eventElementMap.get(eventDate);
      if (!existingEventElements) {
        existingEventElements = [];
        eventElementMap.set(eventDate, existingEventElements);
      }
      existingEventElements.push(getEventElement(event, new Date(eventDate)));
    });
    setDateWiseEventElements(eventElementMap);
  }, [events]);

  const getEventElement = (
    event: CalendarEvent,
    eventDate: Date
  ): EventElement => {
    const durationInMins =
      (new Date(event.endTime).getTime() -
        new Date(event.startTime).getTime()) /
      1000 /
      60;
    const timeSinceMidnight =
      (new Date(event.startTime).getTime() - eventDate.getTime()) / 1000 / 60;

    const textStyle =
      durationInMins > 15
        ? {
            fontSize: 12,
            fontWeight: 500,
            lineHeight: 1.5,
          }
        : {
            fontSize: 11,
            fontWeight: 400,
            lineHeight: 1.2,
          };
    return {
      title: event.title,
      style: {
        width: '135px',
        height: Math.max((40 / 60) * durationInMins, 12),
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
        sx={{ position: 'sticky', background: '#fff', top: 0, zIndex: 1 }}
      >
        <Grid item xs={5} sx={{ borderRight: '1px solid lightgray' }}></Grid>
        {week.map((weekday) => {
          return (
            <React.Fragment key={weekday.getDay()}>
              <Grid
                item
                xs={10}
                sx={{
                  borderBottom: '1px solid lightgray',
                  borderRight: '1px solid lightgray',
                }}
              >
                <Typography
                  component={'div'}
                  style={{
                    margin: '5px 0',
                    fontSize: 12,
                    textAlign: 'center',
                    color: 'gray',
                  }}
                >
                  {CalendarService.getWeekday(weekday)}
                </Typography>
                <Box
                  component="h4"
                  sx={{
                    bgcolor: CalendarService.isToday(weekday)
                      ? 'primary.main'
                      : '',
                    width: 40,
                    height: 40,
                    lineHeight: '40px',
                    textAlign: 'center',
                    borderRadius: '50%',
                    margin: '10px auto',
                    color: CalendarService.isToday(weekday) ? '#fff' : '',
                  }}
                >
                  {weekday.getDate()}
                </Box>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
      <Grid container columns={75}>
        <Grid item xs={5} sx={{ borderRight: '1px solid lightgray' }}>
          <Paper sx={{ height: 10 }} elevation={0}></Paper>
          {hours.map((hour) => {
            return (
              <React.Fragment key={hour}>
                <Paper sx={{ height: 10 }} elevation={0}></Paper>
                <Divider textAlign="left" style={{ marginTop: 8 }}>
                  <Typography
                    component={'span'}
                    style={{ fontSize: 12, color: 'gray' }}
                  >
                    {hour}
                  </Typography>
                </Divider>
              </React.Fragment>
            );
          })}
        </Grid>
        {week.map((weekday) => {
          return (
            <React.Fragment key={weekday.getDay()}>
              <Grid item xs={10} sx={{ borderRight: '1px solid lightgray' }}>
                {dateWiseEventElements
                  ?.get(weekday.toDateString())
                  ?.map((eventElement) => {
                    return (
                      <Paper
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
                          style={{
                            padding: '0 4px',
                            ...eventElement.textStyle,
                          }}
                        >
                          {eventElement.title}
                        </Typography>
                      </Paper>
                    );
                  })}

                {hours.map((hour) => {
                  return (
                    <React.Fragment key={hour}>
                      <Paper
                        elevation={0}
                        square={true}
                        style={{
                          lineHeight: '39px',
                          fontSize: 12,
                          borderBottom: '1px solid lightgray',
                        }}
                      >
                        &nbsp;
                      </Paper>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </>
  );
};

export default WeekView;
