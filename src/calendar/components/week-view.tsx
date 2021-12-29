import React, { useEffect, useState } from 'react';

import CalendarUtils from '../services/calendar-utils';
import { CalendarEvent } from '../models/calendar-event';
import WeekViewHeader from './week-view-header';
import WeekViewBody from './week-view-body';

const WeekView: React.FC<{ firstDayOfWeek: Date; events: CalendarEvent[] }> = ({
  firstDayOfWeek,
  events,
}) => {
  const [week, setWeek] = useState<Date[]>([]);

  useEffect(() => {
    setWeek(CalendarUtils.getWeekByFirstDay(firstDayOfWeek));
  }, [firstDayOfWeek]);

  return (
    <>
      <WeekViewHeader week={week}></WeekViewHeader>
      <WeekViewBody week={week} events={events}></WeekViewBody>
    </>
  );
};

export default WeekView;
