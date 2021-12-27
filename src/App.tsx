import React, { useEffect, useState } from 'react';

import { Container } from '@mui/material';

import './App.css';
import { WeekNavigator, WeekView } from './calendar';
import AppNavbar from './common/components/app-navbar';
import CalendarService from './calendar/services/calendar-service';
import EventService from './events/event-service';
import { CalendarEvent } from './calendar/models/calendar-event';

function App() {
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<Date>(
    CalendarService.getFirstDayOfWeek()
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
          firstDayOfWeekChanged={setFirstDayOfWeek}
        ></WeekNavigator>
      </AppNavbar>
      <Container fixed>
        <WeekView firstDayOfWeek={firstDayOfWeek} events={events}></WeekView>
      </Container>
    </>
  );
}

export default App;
