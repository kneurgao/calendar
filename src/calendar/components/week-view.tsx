import React, { useEffect, useState } from 'react';

import { Box, Divider, Grid, Paper, Typography } from '@mui/material';

import CalendarService from '../services/calendar.service';

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

const WeekView: React.FC<{ firstDayOfWeek: Date }> = ({ firstDayOfWeek }) => {
  const [week, setWeek] = useState<Date[]>([]);

  useEffect(() => {
    setWeek(CalendarService.getWeekByFirstDay(firstDayOfWeek));
  }, [firstDayOfWeek]);

  return (
    <>
      <Grid
        container
        columns={100}
        sx={{ position: 'sticky', background: '#fff', top: 0, zIndex: 1 }}
      >
        <Grid item xs={6}></Grid>
        <Divider orientation='vertical' flexItem></Divider>
        {week.map((weekday) => {
          return (
            <React.Fragment key={weekday.getDay()}>
              <Grid item xs={13}>
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
                  component='h4'
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
                <Divider />
              </Grid>
              <Divider orientation='vertical' flexItem></Divider>
            </React.Fragment>
          );
        })}
      </Grid>
      <Grid container columns={100}>
        <Grid item xs={6}>
          <Paper sx={{ height: 10 }} elevation={0}></Paper>
          {hours.map((hour) => {
            return (
              <React.Fragment key={hour}>
                <Paper sx={{ height: 10 }} elevation={0}></Paper>
                <Divider textAlign='left' style={{ marginTop: 9 }}>
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
        <Divider orientation='vertical' flexItem></Divider>
        {week.map((weekday) => {
          return (
            <React.Fragment key={weekday.getDay()}>
              <Grid item xs={13}>
                {hours.map((hour) => {
                  return (
                    <React.Fragment key={hour}>
                      <Paper
                        elevation={0}
                        style={{ lineHeight: '40px', fontSize: 12 }}
                      >
                        {hour}
                      </Paper>
                      <Divider />
                    </React.Fragment>
                  );
                })}
              </Grid>
              <Divider orientation='vertical' flexItem></Divider>
            </React.Fragment>
          );
        })}
      </Grid>
    </>
  );
};

export default WeekView;
