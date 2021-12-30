import React from 'react';

import { Typography, Paper, Tooltip, Zoom } from '@mui/material';

import { EventElement } from '../models/event-element';

const WeekViewEvents: React.FC<{
  eventElements?: EventElement[];
}> = ({ eventElements }) => {
  return (
    <>
      {eventElements?.map((eventElement, index) => {
        return (
          <Tooltip
            key={index}
            TransitionComponent={Zoom}
            followCursor
            placement={'right-start'}
            title={eventElement.title + ' (' + eventElement.time + ')'}
          >
            <Paper
              elevation={eventElement.elevation}
              sx={{
                color: '#fff',
                bgcolor: '#039be5',
                position: 'absolute',
                marginBottom: '2px',
                cursor: 'pointer',
                ':hover': {
                  zIndex: 2,
                },
                ...eventElement.style,
              }}
            >
              <Typography
                component={'h6'}
                sx={{
                  padding: '0 4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  ...eventElement.textStyle,
                }}
              >
                {eventElement.title}
              </Typography>
              <Typography
                component={'h6'}
                sx={{
                  padding: '4px',
                  fontSize: 10,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {eventElement.time}
              </Typography>
            </Paper>
          </Tooltip>
        );
      })}
    </>
  );
};

export default WeekViewEvents;
