import React, { useEffect, useState } from 'react';

import { Container } from '@mui/material';

import './App.css';
import { CalendarEvent, WeekNavigator, WeekView } from './calendar';
import AppNavbar from './common/components/app-navbar';
import CalendarUtils from './calendar/services/calendar-utils';
import EventService from './events/event-service';

function App() {
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<Date>(
    CalendarUtils.getFirstDayOfWeek()
  );
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      setEvents(await EventService.getAll(firstDayOfWeek));
    };
    fetchEvents();
  }, [firstDayOfWeek]);

  return (
    <>
      <AppNavbar>
        <WeekNavigator
          firstDayOfWeek={firstDayOfWeek}
          onChange={setFirstDayOfWeek}
        ></WeekNavigator>
      </AppNavbar>
      <Container maxWidth={'lg'}>
        <WeekView firstDayOfWeek={firstDayOfWeek} events={events}></WeekView>
      </Container>
    </>
  );
}

export default App;
