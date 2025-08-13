import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'dashboard', label: 'Главная', icon: '🏠', path: '/employee/dashboard' },
  { id: 'catalog', label: 'Каталог льгот', icon: '🛍️', path: '/employee/catalog' },
  { id: 'allocate', label: 'Распределить баллы', icon: '⚖️', path: '/employee/allocate' },
  { id: 'history', label: 'История', icon: '📊', path: '/employee/history' },
  { id: 'support', label: 'Поддержка', icon: '💬', path: '/employee/support' },
  { id: 'satisfaction', label: 'Оценка сервиса', icon: '⭐', path: '/employee/satisfaction' },
  { id: 'recommendations', label: 'Рекомендации', icon: '🤖', path: '/employee/recommendations' },
  { id: 'settings', label: 'Настройки', icon: '⚙️', path: '/employee/settings' },
];

export function EmployeeSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!user) return null;

  return (
    <div className={cn(
      "bg-white border-r flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#6AFCBA] to-[#B6D9FC] rounded-lg flex items-center justify-center text-white font-bold">
            B
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg">Benefit Admin</h1>
              <p className="text-xs text-gray-500">Сотрудник</p>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.department}</p>
            </div>
          </div>
          <Badge variant="default" className="mt-2 w-full justify-center">
            {user.pointsBalance?.toLocaleString('ru-RU')} баллов
          </Badge>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )
            }
          >
            <span className="text-lg">{item.icon}</span>
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full mb-2"
        >
          {isCollapsed ? '→' : '←'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="w-full"
        >
          {isCollapsed ? '↗' : 'Выйти'}
        </Button>
      </div>
    </div>
  );
}
