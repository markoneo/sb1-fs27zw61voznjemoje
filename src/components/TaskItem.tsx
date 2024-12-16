import React from 'react';
import { Check, Trash2, Calendar } from 'lucide-react';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const formatDateTime = (datetime: string) => {
    try {
      const date = new Date(datetime);
      return date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => onToggle(task.id)}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
            ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-400 hover:border-blue-500'}`}
        >
          {task.completed && <Check className="w-3 h-3 text-white" />}
        </button>
        <div className="flex-1">
          <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.text}
          </span>
          {task.datetime && (
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <Calendar className="w-4 h-4" />
              {formatDateTime(task.datetime)}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-gray-500 hover:text-red-500 ml-4 p-1 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}