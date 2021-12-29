import React from 'react';

import { CalendarEvent } from './../models/calendar-event';

const EventsContext = React.createContext<{
  events: CalendarEvent[];
}>({
  events: [],
});

export default EventsContext;
