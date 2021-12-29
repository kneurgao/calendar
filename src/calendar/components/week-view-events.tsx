import React from 'react';

import { Typography, Paper } from '@mui/material';

import { EventElement } from '../models/event-element';

const WeekViewEvents: React.FC<{
  eventElements?: EventElement[];
}> = ({ eventElements }) => {
  return (
    <>
      {eventElements?.map((eventElement, index) => {
        return (
          <Paper
            key={index}
            elevation={1}
            sx={{
              color: '#fff',
              bgcolor: '#039be5',
              position: 'absolute',
              marginBottom: '2px',
              ...eventElement.style,
            }}
          >
            <Typography
              component={'h6'}
              sx={{
                padding: '0 4px',
                ...eventElement.textStyle,
              }}
            >
              {eventElement.title}
            </Typography>
          </Paper>
        );
      })}
    </>
  );
};

export default WeekViewEvents;
