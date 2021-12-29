import React, { useEffect, useRef, useState } from 'react';

import { Paper } from '@mui/material';

import CalendarUtils from '../services/calendar-utils';

const WeekViewCurrentTimeline: React.FC = () => {
  const [currentTimeline, setCurrentTimeline] = useState<number>(0);
  let timelineRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (currentTimeline) {
      timelineRef.current?.scrollIntoView({
        block: 'end',
        inline: 'nearest',
        behavior: 'smooth',
      });
    }
  });

  return (
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
    >
      <div ref={timelineRef}></div>
    </Paper>
  );
};

export default WeekViewCurrentTimeline;
