import React from 'react';

import { Grid } from '@mui/material';

import WeekViewConstants from '../constants/week-view-constants';
import WeekViewMargin from './week-view-margin';
import WeekViewContent from './week-view-content';
import { CalendarEvent } from '../models/calendar-event';

const WeekViewBody: React.FC<{
  week: Date[];
  events: CalendarEvent[];
}> = ({ week, events }) => {
  return (
    <Grid container columns={WeekViewConstants.totalWidth}>
      <WeekViewMargin></WeekViewMargin>
      <WeekViewContent week={week} events={events}></WeekViewContent>
    </Grid>
  );
};

export default WeekViewBody;
