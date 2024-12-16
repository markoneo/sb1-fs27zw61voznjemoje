import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Task } from '../../types/task';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (text: string, datetime: string) => void;
  onClose: () => void;
}

export function TaskForm({ task, onSubmit, onClose }: TaskFormProps) {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (task) {
      setText(task.text);
      if (task.datetime) {
        const dateObj = new Date(task.datetime);
        setDate(dateObj.toISOString().split('T')[0]);
        setTime(dateObj.toTimeString().slice(0, 5));
      }
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim() || !date || !time) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const datetime = `${date}T${time}`;
      // Validate the datetime string
      new Date(datetime).toISOString();
      onSubmit(text.trim(), datetime);
      setText('');
      setDate('');
      setTime('');
    } catch (error) {
      alert('Please enter a valid date and time');
    }
  };

  // Set min date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {task ? 'Edit Task' : 'Create New Task'}
      </h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Task Description
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
          placeholder="Enter task details..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date
          </label>
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {task ? 'Save Changes' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}