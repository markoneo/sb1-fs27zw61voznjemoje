import React from 'react';
import { Task } from '../../types/task';
import { CalendarCell } from './CalendarCell';

interface CalendarGridProps {
  days: Date[];
  currentDate: Date;
  getTasksForDate: (date: Date) => Task[];
}

export function CalendarGrid({ days, currentDate, getTasksForDate }: CalendarGridProps) {
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
      {days.map((date, index) => (
        <CalendarCell
          key={index}
          date={date}
          isToday={isToday(date)}
          isCurrentMonth={isCurrentMonth(date)}
          tasks={getTasksForDate(date)}
        />
      ))}
    </div>
  );
}