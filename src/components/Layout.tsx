import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Layout({ children, activeTab = 'dashboard', onTabChange }: LayoutProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  const isEmployee = user.role === 'employee';
  const isHR = user.role === 'hr';

  const employeeTabs = [
    { id: 'dashboard', label: 'Главная', icon: '🏠' },
    { id: 'catalog', label: 'Каталог льгот', icon: '🛍️' },
    { id: 'history', label: 'История', icon: '📊' },
    { id: 'profile', label: 'Профиль', icon: '👤' },
    { id: 'settings', label: 'Настройки', icon: '⚙️' },
  ];

  const hrTabs = [
    { id: 'dashboard', label: 'Панель управления', icon: '📊' },
    { id: 'employees', label: 'Сотрудники', icon: '👥' },
    { id: 'settings', label: 'Настройки', icon: '⚙️' },
    { id: 'analytics', label: 'Аналитика', icon: '📈' },
  ];

  const tabs = isEmployee ? employeeTabs : hrTabs;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#6AFCBA] to-[#B6D9FC] rounded-lg flex items-center justify-center text-white font-bold">
                B
              </div>
              <div>
                <h1 className="text-xl font-bold">Benefit Admin AI</h1>
                <p className="text-xs text-gray-500">{user.department}</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {isEmployee && (
                <Badge variant="default" className="hidden sm:block">
                  {user.pointsBalance?.toLocaleString('ru-RU')} баллов
                </Badge>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isEmployee && (
                    <>
                      <DropdownMenuItem onClick={() => onTabChange?.('profile')}>
                        Профиль
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onTabChange?.('settings')}>
                        Настройки
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={logout}>
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className={cn(
                  "flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                  activeTab === tab.id
                    ? "border-[#1D92C5] text-[#1D92C5]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>
    </div>
  );
}
