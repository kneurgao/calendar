import React, { useEffect, useState } from 'react';

import { Paper } from '@mui/material';

import CalendarUtils from '../services/calendar-utils';

const WeekViewCurrentTimeline: React.FC<{
  weekday: Date;
}> = ({ weekday }) => {
  const [currentTimeline, setCurrentTimeline] = useState<number>(0);

  useEffect(() => {
    // Calculate position of timeline
    const updateCurrentTimeline = () => {
      const minutesSinceMidnight = CalendarUtils.getMinutesSinceMidnight();
      setCurrentTimeline((40 / 60) * minutesSinceMidnight - 1);
    };

    // Update current timeline
    updateCurrentTimeline();
    const currentTimelineTimer = setInterval(updateCurrentTimeline, 1000 * 60);

    // Clear timeline timer
    return () => {
      clearInterval(currentTimelineTimer);
    };
  }, []);

  return (
    <>
      {CalendarUtils.isToday(weekday) && (
        <Paper
          elevation={0}
          sx={{
            bgcolor: '#ea4335',
            position: 'absolute',
            zIndex: 2,
            width: '11%',
            height: '2px',
            marginLeft: '2px',
            marginTop: currentTimeline + 'px',
          }}
        ></Paper>
      )}
    </>
  );
};

export default WeekViewCurrentTimeline;
