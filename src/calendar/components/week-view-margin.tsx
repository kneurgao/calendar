import React from 'react';

import { Grid, Typography, Paper, Divider } from '@mui/material';

import CalendarUtils from '../services/calendar-utils';
import WeekViewConstants from '../constants/week-view-constants';

const WeekViewMargin: React.FC = () => {
  return (
    <Grid
      item
      xs={WeekViewConstants.marginWidth}
      sx={{ borderRight: '1px solid lightgray' }}
    >
      <Paper sx={{ height: 10 }} elevation={0}></Paper>

      {/* Left margin to show time in each hour slot */}
      {CalendarUtils.get24HourSlots().map((hour) => {
        return (
          <Divider key={hour} textAlign="left" style={{ marginTop: 18 }}>
            <Typography component={'span'} sx={{ fontSize: 12, color: 'gray' }}>
              {hour}
            </Typography>
          </Divider>
        );
      })}
    </Grid>
  );
};

export default WeekViewMargin;
