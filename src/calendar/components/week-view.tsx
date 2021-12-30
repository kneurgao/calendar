import React from 'react';

import WeekViewHeader from './week-view-header';
import WeekViewBody from './week-view-body';
import WeekContext from '../contexts/week-context';
import EventsContext from '../contexts/events-context';
import CalendarUtils from '../services/calendar-utils';
import { CalendarEvent } from '../models/calendar-event';

const WeekView: React.FC<{ firstDayOfWeek: Date; events: CalendarEvent[] }> = ({
  firstDayOfWeek,
  events,
}) => {
  return (
    <WeekContext.Provider
      value={{ week: CalendarUtils.getWeekByFirstDay(firstDayOfWeek) }}
    >
      <WeekViewHeader></WeekViewHeader>
      <EventsContext.Provider value={{ events }}>
        <WeekViewBody></WeekViewBody>
      </EventsContext.Provider>
    </WeekContext.Provider>
  );
};

export default WeekView;
