import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { QuickStats } from './components/QuickStats';
import { TaskList } from './components/TaskList/TaskList';
import { Calendar } from './components/Calendar';
import { Task } from './types/task';
import { Menu } from 'lucide-react';
import { sortTasksByDateTime } from './utils/taskUtils';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeView, setActiveView] = useState<'dashboard' | 'tasks' | 'calendar'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addTask = (text: string, datetime: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      datetime,
      completed: false
    };
    setTasks(prevTasks => sortTasksByDateTime([...prevTasks, newTask]));
  };

  const editTask = (id: number, text: string, datetime: string) => {
    setTasks(prevTasks =>
      sortTasksByDateTime(
        prevTasks.map(task =>
          task.id === id ? { ...task, text, datetime } : task
        )
      )
    );
  };

  const toggleTask = (id: number) => {
    setTasks(prevTasks => 
      sortTasksByDateTime(
        prevTasks.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prevTasks => 
      sortTasksByDateTime(
        prevTasks.filter(task => task.id !== id)
      )
    );
  };

  const renderContent = () => {
    const sortedTasks = sortTasksByDateTime(tasks);
    
    switch (activeView) {
      case 'calendar':
        return <Calendar tasks={sortedTasks} />;
      case 'tasks':
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks</h2>
            <TaskList
              tasks={sortedTasks}
              onAddTask={addTask}
              onEditTask={editTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </div>
        );
      default:
        return (
          <>
            <QuickStats tasks={sortedTasks} />
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks</h2>
              <TaskList
                tasks={sortedTasks}
                onAddTask={addTask}
                onEditTask={editTask}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className={`
        fixed inset-y-0 left-0 z-40 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          activeView={activeView} 
          onViewChange={(view) => {
            setActiveView(view);
            setIsSidebarOpen(false);
          }}
        />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {activeView === 'dashboard' ? 'Welcome Back!' : 
               activeView === 'calendar' ? 'Calendar' : 'Tasks'}
            </h1>
            <p className="text-gray-600">
              {activeView === 'dashboard' ? "Here's an overview of your tasks and activities" : 
               activeView === 'calendar' ? 'View and manage your scheduled tasks' : 
               'Manage your tasks and stay organized'}
            </p>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}