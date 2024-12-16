import React from 'react';
import { Check, Trash2, Calendar, Edit2 } from 'lucide-react';
import { Task } from '../../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const formatDateTime = (datetime: string) => {
    return new Date(datetime).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => onToggle(task.id)}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
            ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}
        >
          {task.completed && <Check className="w-3 h-3 text-white" />}
        </button>
        <div className="flex-1">
          <span className={task.completed ? 'line-through text-gray-500' : ''}>
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
      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="text-gray-500 hover:text-blue-500 p-1 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Edit task"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}