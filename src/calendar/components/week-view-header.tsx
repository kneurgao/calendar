import React, { useContext } from 'react';

import { Grid, Typography, Box } from '@mui/material';

import CalendarUtils from '../services/calendar-utils';
import WeekViewConstants from '../constants/week-view-constants';
import WeekContext from '../contexts/week-context';

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
      <Grid
        item
        xs={WeekViewConstants.marginWidth}
        sx={{ borderRight: '1px solid lightgray' }}
      ></Grid>
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
            <Typography
              component={'div'}
              sx={{
                margin: '10px 0',
                fontSize: 12,
                textAlign: 'center',
                color: 'gray',
              }}
            >
              {CalendarUtils.getWeekday(weekday)}
            </Typography>
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
