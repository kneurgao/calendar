import React, { useContext, useEffect, useState } from 'react';

import { Grid, Paper } from '@mui/material';

import WeekContext from '../contexts/week-context';
import EventsContext from '../contexts/events-context';
import WeekViewEvents from './week-view-events';
import WeekViewCurrentTimeline from './week-view-current-timeline';
import CalendarUtils from '../services/calendar-utils';
import EventUtils from '../services/event-utils';
import { EventElement } from '../models/event-element';
import WeekViewConstants from '../constants/week-view-constants';

const WeekViewContent: React.FC = () => {
  const { week } = useContext(WeekContext);
  const { events } = useContext(EventsContext);
  const [dateWiseEventElements, setDateWiseEventElements] =
    useState<Map<number, EventElement[]>>();

  useEffect(() => {
    if (events?.length > 0) {
      setDateWiseEventElements(EventUtils.groupByDate(events));
    }
  }, [events]);

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
            {/* Show current time line for today */}
            {CalendarUtils.isToday(weekday) && (
              <WeekViewCurrentTimeline></WeekViewCurrentTimeline>
            )}

            {/* List events */}
            {dateWiseEventElements?.has(weekday.getDate()) && (
              <WeekViewEvents
                eventElements={dateWiseEventElements.get(weekday.getDate())}
              ></WeekViewEvents>
            )}

            {/* Show hour slots for a week day */}
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
