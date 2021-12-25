import React, { useState } from 'react';

import { Container } from '@mui/material';

import './App.css';
import { WeekNavigator, WeekView } from './calendar';
import CalendarService from './calendar/services/calendar-service';

function App() {
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<Date>(
    CalendarService.getFirstDayOfWeek()
  );

  return (
    <>
      <Container fixed>
        <WeekNavigator
          firstDayOfWeek={firstDayOfWeek}
          firstDayOfWeekChanged={setFirstDayOfWeek}
        ></WeekNavigator>
        <WeekView firstDayOfWeek={firstDayOfWeek}></WeekView>
      </Container>
    </>
  );
}

export default App;
