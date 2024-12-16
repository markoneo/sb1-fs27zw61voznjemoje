import React from 'react';
import { Task } from '../../types/task';

interface CalendarCellProps {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  tasks: Task[];
}

export function CalendarCell({ date, isToday, isCurrentMonth, tasks }: CalendarCellProps) {
  return (
    <div
      className={`min-h-[100px] p-2 bg-white ${
        !isCurrentMonth ? 'text-gray-400' : ''
      }`}
    >
      <div className="flex items-center justify-center mb-1">
        <span
          className={`w-7 h-7 flex items-center justify-center rounded-full ${
            isToday
              ? 'bg-blue-600 text-white'
              : 'text-gray-700'
          }`}
        >
          {date.getDate()}
        </span>
      </div>
      <div className="space-y-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`text-xs p-1 rounded ${
              task.completed
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            } truncate`}
            title={task.text}
          >
            {task.text}
          </div>
        ))}
      </div>
    </div>
  );
}