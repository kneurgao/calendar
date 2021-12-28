import React, { useEffect, useState } from 'react';

import { Grid, IconButton, Tooltip, Typography, Zoom } from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Today,
} from '@mui/icons-material';

import CalendarUtils from '../services/calendar-utils';

const WeekNavigator: React.FC<{
  firstDayOfWeek: Date;
  weekChanged: (date: Date) => void;
}> = ({ firstDayOfWeek, weekChanged }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(CalendarUtils.getMonthName(firstDayOfWeek));
  }, [firstDayOfWeek]);

  const gotoCurrentWeek = () => {
    weekChanged(CalendarUtils.getFirstDayOfWeek());
  };

  const gotoPrevWeek = () => {
    weekChanged(
      CalendarUtils.getFirstDayOfPrevWeek(firstDayOfWeek)
    );
  };

  const gotoNextWeek = () => {
    weekChanged(
      CalendarUtils.getFirstDayOfNextWeek(firstDayOfWeek)
    );
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Tooltip
            TransitionComponent={Zoom}
            title={CalendarUtils.getToday()}
          >
            <IconButton aria-label='Today' onClick={gotoCurrentWeek}>
              <Today />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip TransitionComponent={Zoom} title='Previous week'>
            <IconButton aria-label='Prev' onClick={gotoPrevWeek}>
              <KeyboardArrowLeft />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title='Next week'>
            <IconButton aria-label='Next' onClick={gotoNextWeek}>
              <KeyboardArrowRight />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Typography variant='h6' sx={{ padding: '4px', fontWeight: 400 }}>
            {title}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default WeekNavigator;
