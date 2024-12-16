import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Task } from '../../types/task';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { useCalendar } from './useCalendar';

interface CalendarProps {
  tasks: Task[];
}

export function Calendar({ tasks }: CalendarProps) {
  const {
    currentDate,
    calendarDays,
    nextMonth,
    prevMonth,
    today,
  } = useCalendar();

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      if (!task.datetime) return false;
      const taskDate = new Date(task.datetime);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 lg:p-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-6 min-w-[600px]">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={today}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="min-w-[600px]">
        <CalendarHeader />
        <CalendarGrid
          days={calendarDays}
          currentDate={currentDate}
          getTasksForDate={getTasksForDate}
        />
      </div>
    </div>
  );
}