import React, { useContext } from 'react';

import { Grid, Paper } from '@mui/material';

import WeekViewConstants from '../constants/week-view-constants';
import WeekContext from '../contexts/week-context';
import WeekViewEvents from './week-view-events';
import WeekViewCurrentTimeline from './week-view-current-timeline';
import CalendarUtils from '../services/calendar-utils';

const WeekViewContent: React.FC = () => {
  const { week } = useContext(WeekContext);

  return (
    <>
      {week.map((weekday) => {
        return (
          <Grid
            key={weekday.getDay()}
            item
            xs={WeekViewConstants.dayColumnWidth}
            sx={{ borderRight: '1px solid lightgray' }}
          >
            <WeekViewCurrentTimeline
              weekday={weekday}
            ></WeekViewCurrentTimeline>
            <WeekViewEvents weekday={weekday}></WeekViewEvents>

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
    </>
  );
};

export default WeekViewContent;
