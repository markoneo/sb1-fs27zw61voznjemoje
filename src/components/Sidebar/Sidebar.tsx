import React from 'react';
import { Home, Calendar, CheckSquare } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { Logo } from '../Logo';

interface SidebarProps {
  activeView: 'dashboard' | 'tasks' | 'calendar';
  onViewChange: (view: 'dashboard' | 'tasks' | 'calendar') => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', value: 'dashboard' as const },
  { icon: CheckSquare, label: 'Tasks', value: 'tasks' as const },
  { icon: Calendar, label: 'Calendar', value: 'calendar' as const },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 p-4">
      <div className="mb-8">
        <Logo />
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.value}
            icon={item.icon}
            label={item.label}
            active={activeView === item.value}
            onClick={() => onViewChange(item.value)}
          />
        ))}
      </nav>
    </div>
  );
}