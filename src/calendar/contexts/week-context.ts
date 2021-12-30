import React from 'react';

const WeekContext = React.createContext<{ week: Date[] }>({
  week: [],
});

export default WeekContext;
