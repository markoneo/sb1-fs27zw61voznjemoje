import React from 'react';
import { CheckCircle2, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { Task } from '../types/task';

interface QuickStatsProps {
  tasks: Task[];
}

export function QuickStats({ tasks }: QuickStatsProps) {
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const upcomingTasks = tasks.filter(task => {
    if (!task.datetime || task.completed) return false;
    const taskDate = new Date(task.datetime);
    const now = new Date();
    return taskDate > now;
  }).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Completed Tasks</h3>
            <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Pending Tasks</h3>
            <p className="text-2xl font-bold text-gray-900">{pendingTasks}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm sm:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <CalendarIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Upcoming Events</h3>
            <p className="text-2xl font-bold text-gray-900">{upcomingTasks}</p>
          </div>
        </div>
      </div>
    </div>
  );
}