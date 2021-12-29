import React from 'react';

interface Week {
  week: Date[];
  setWeek: (week: Date[]) => void;
}

const WeekContext = React.createContext<Week>({
  week: [],
  setWeek: () => {
    // Default
  },
});

export default WeekContext;
