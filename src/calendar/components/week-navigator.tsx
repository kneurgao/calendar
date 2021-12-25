import React, { useEffect, useState } from 'react';

import { Grid, IconButton, Tooltip, Typography, Zoom } from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Today,
} from '@mui/icons-material';

import CalendarService from '../services/calendar.service';

const WeekNavigator: React.FC<{
  firstDayOfWeek: Date;
  firstDayOfWeekChanged: (date: Date) => void;
}> = ({ firstDayOfWeek, firstDayOfWeekChanged }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(CalendarService.getMonthName(firstDayOfWeek));
  }, [firstDayOfWeek]);

  const gotoCurrentWeek = () => {
    firstDayOfWeekChanged(CalendarService.getFirstDayOfWeek());
  };

  const gotoPrevWeek = () => {
    firstDayOfWeekChanged(
      CalendarService.getFirstDayOfPrevWeek(firstDayOfWeek)
    );
  };

  const gotoNextWeek = () => {
    firstDayOfWeekChanged(
      CalendarService.getFirstDayOfNextWeek(firstDayOfWeek)
    );
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item>
          <Tooltip
            TransitionComponent={Zoom}
            title={CalendarService.getToday()}
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
          <Typography variant='h5' sx={{ padding: '4px', color: 'gray' }}>
            {title}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default WeekNavigator;
