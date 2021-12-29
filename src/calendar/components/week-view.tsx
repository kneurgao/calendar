import React, { useEffect, useState } from 'react';

import CalendarUtils from '../services/calendar-utils';
import { CalendarEvent } from '../models/calendar-event';
import WeekViewHeader from './week-view-header';
import WeekViewBody from './week-view-body';
import WeekContext from '../contexts/week-context';

const WeekView: React.FC<{ firstDayOfWeek: Date; events: CalendarEvent[] }> = ({
  firstDayOfWeek,
  events,
}) => {
  const [week, setWeek] = useState<Date[]>([]);

  useEffect(() => {
    setWeek(CalendarUtils.getWeekByFirstDay(firstDayOfWeek));
  }, [firstDayOfWeek]);

  return (
    <WeekContext.Provider value={{week, setWeek}}>
      <WeekViewHeader></WeekViewHeader>
      <WeekViewBody events={events}></WeekViewBody>
    </WeekContext.Provider>
  );
};

export default WeekView;
