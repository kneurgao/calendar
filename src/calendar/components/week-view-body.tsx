import React from 'react';

import { Grid } from '@mui/material';

import WeekViewConstants from '../constants/week-view-constants';
import WeekViewMargin from './week-view-margin';
import WeekViewContent from './week-view-content';

const WeekViewBody: React.FC = () => {
  return (
    <Grid container columns={WeekViewConstants.totalWidth}>
      <WeekViewMargin></WeekViewMargin>
      <WeekViewContent></WeekViewContent>
    </Grid>
  );
};

export default WeekViewBody;
