import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task } from '../../types/task';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onAddTask: (text: string, datetime: string) => void;
  onEditTask: (id: number, text: string, datetime: string) => void;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

export function TaskList({ tasks, onAddTask, onEditTask, onToggleTask, onDeleteTask }: TaskListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (text: string, datetime: string) => {
    onAddTask(text, datetime);
    setIsModalOpen(false);
  };

  const handleEditTask = (text: string, datetime: string) => {
    if (editingTask) {
      onEditTask(editingTask.id, text, datetime);
      setEditingTask(null);
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
  };

  return (
    <>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="mb-6">
          <button
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Task
          </button>
        </div>
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No tasks yet. Click "Add New Task" to get started!</p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
                onEdit={() => handleEditClick(task)}
              />
            ))
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen || editingTask !== null} onClose={() => {
        setIsModalOpen(false);
        setEditingTask(null);
      }}>
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleEditTask : handleAddTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
        />
      </Modal>
    </>
  );
}