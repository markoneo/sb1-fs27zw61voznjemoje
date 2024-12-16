import React from 'react';
import { Home, Calendar, CheckSquare, BookOpen, Settings } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: BookOpen, label: 'Notes', path: '/notes' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <Home className="w-6 h-6 text-blue-600" />
        <h1 className="text-xl font-bold text-gray-800">Personal Hub</h1>
      </div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}