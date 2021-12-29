import React, { ReactNode } from 'react';

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { CalendarViewWeek } from '@mui/icons-material';

const AppNavbar: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={1} position="fixed" color="inherit">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <CalendarViewWeek />
          </IconButton>
          <Typography variant={'h6'} sx={{ flexGrow: 1, mr: 8 }}>
            Calendar
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppNavbar;
