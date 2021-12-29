import React from 'react';

import { Grid } from '@mui/material';

import WeekViewMargin from './week-view-margin';
import WeekViewContent from './week-view-content';
import WeekViewConstants from '../constants/week-view-constants';

const WeekViewBody: React.FC = () => {
  return (
    <Grid container columns={WeekViewConstants.totalWidth}>
      <WeekViewMargin></WeekViewMargin>
      <WeekViewContent></WeekViewContent>
    </Grid>
  );
};

export default WeekViewBody;
