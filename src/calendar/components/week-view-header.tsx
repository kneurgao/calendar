import React, { useContext } from 'react';

import { Grid, Typography, Box } from '@mui/material';

import WeekContext from '../contexts/week-context';
import CalendarUtils from '../services/calendar-utils';
import WeekViewConstants from '../constants/week-view-constants';

const WeekViewHeader: React.FC = () => {
  const { week } = useContext(WeekContext);

  return (
    <Grid
      container
      columns={WeekViewConstants.totalWidth}
      sx={{
        position: 'sticky',
        background: '#fff',
        top: 64,
        marginTop: 8,
        zIndex: 3,
        overflow: 'hidden',
      }}
    >
      {/* Top-left notch */}
      <Grid
        item
        xs={WeekViewConstants.marginWidth}
        sx={{ borderRight: '1px solid lightgray' }}
      ></Grid>

      {/* Week headers */}
      {week.map((weekday) => {
        return (
          <Grid
            item
            key={weekday.getDay()}
            xs={WeekViewConstants.dayColumnWidth}
            sx={{
              borderBottom: '1px solid lightgray',
              borderRight: '1px solid lightgray',
            }}
          >
            {/* Day */}
            <Typography
              component={'div'}
              sx={{
                margin: '10px 0',
                fontSize: 12,
                textAlign: 'center',
                color: 'gray',
                textTransform: 'uppercase',
              }}
            >
              {CalendarUtils.getWeekday(weekday)}
            </Typography>

            {/* Date */}
            <Box
              component={'h4'}
              sx={{
                bgcolor: CalendarUtils.isToday(weekday) ? 'primary.main' : '',
                width: 40,
                height: 40,
                lineHeight: '40px',
                textAlign: 'center',
                borderRadius: '50%',
                margin: '10px auto',
                color: CalendarUtils.isToday(weekday) ? '#fff' : '',
              }}
            >
              {weekday.getDate()}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default WeekViewHeader;
