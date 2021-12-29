import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Today,
} from '@mui/icons-material';

import ActionButton from './action-button';
import CalendarUtils from '../services/calendar-utils';

const WeekNavigator: React.FC<{
  firstDayOfWeek: Date;
  onChange: (date: Date) => void;
}> = ({ firstDayOfWeek, onChange }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(CalendarUtils.getMonthName(firstDayOfWeek));
  }, [firstDayOfWeek]);

  const gotoCurrentWeek = () => {
    onChange(CalendarUtils.getFirstDayOfWeek());
  };

  const gotoPrevWeek = () => {
    onChange(CalendarUtils.getFirstDayOfPrevWeek(firstDayOfWeek));
  };

  const gotoNextWeek = () => {
    onChange(CalendarUtils.getFirstDayOfNextWeek(firstDayOfWeek));
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <ActionButton
            label="Today"
            title={CalendarUtils.getToday()}
            onClick={gotoCurrentWeek}
          >
            <Today />
          </ActionButton>
        </Grid>
        <Grid item>
          <ActionButton
            label="Prev"
            title="Previous week"
            onClick={gotoPrevWeek}
          >
            <KeyboardArrowLeft />
          </ActionButton>
          <ActionButton
            label="Next"
            title="Next week"
            onClick={gotoNextWeek}
          >
            <KeyboardArrowRight />
          </ActionButton>
        </Grid>
        <Grid item>
          <Typography variant="h6" sx={{ padding: '4px', fontWeight: 400 }}>
            {title}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default WeekNavigator;
