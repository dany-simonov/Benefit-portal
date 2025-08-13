import { Outlet } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'dashboard', label: 'Обзор', icon: '📊', path: '/hr/dashboard' },
  { id: 'employees', label: 'Сотрудники', icon: '👥', path: '/hr/employees' },
  { id: 'benefit-config', label: 'Конфигурация льгот', icon: '⚙️', path: '/hr/benefit-config' },
  { id: 'upload', label: 'Импорт данных', icon: '📥', path: '/hr/upload' },
  { id: 'analytics', label: 'Аналитика', icon: '📈', path: '/hr/analytics' },
  { id: 'recommendations', label: 'ИИ-рекомендации', icon: '🤖', path: '/hr/recommendations' },
  { id: 'settings', label: 'Настройки', icon: '⚙️', path: '/hr/settings' },
];

const HrLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#6AFCBA] to-[#B6D9FC] rounded-lg flex items-center justify-center text-white font-bold">
              B
            </div>
            <div>
              <h1 className="font-bold text-lg">Benefit Admin</h1>
              <p className="text-xs text-gray-500">HR Панель</p>
            </div>
          </div>
        </div>

        {/* User Info */}
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
            HR Менеджер
          </Badge>
        </div>

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
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full"
          >
            Выйти
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default HrLayout;
