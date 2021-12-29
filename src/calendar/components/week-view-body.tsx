import React from 'react';

import { Grid, Typography, Divider, Paper } from '@mui/material';

import CalendarUtils from '../services/calendar-utils';
import { EventElement } from '../models/event-element';
import WeekViewConstants from '../constants/week-view-constants';

const WeekViewBody: React.FC<{
  week: Date[];
  dateWiseEventElements?: Map<string, EventElement[]>;
  currentTimeline: number;
}> = ({ week, dateWiseEventElements, currentTimeline }) => {
  return (
    <Grid container columns={WeekViewConstants.totalWidth}>
      <Grid
        item
        xs={WeekViewConstants.marginWidth}
        sx={{ borderRight: '1px solid lightgray' }}
      >
        <Paper sx={{ height: 10 }} elevation={0}></Paper>
        {CalendarUtils.get24HourSlots().map((hour) => {
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
    </Grid>
  );
};

export default WeekViewBody;
