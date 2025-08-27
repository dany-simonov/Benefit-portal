import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function UserSettings() {
  const { logout } = useAuth();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    frequency: 'weekly'
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [integrations, setIntegrations] = useState({
    yandexTaxi: true,
    deliveryClub: false,
    carsharing: true
  });

  const [general, setGeneral] = useState({
    language: 'ru',
    timezone: 'Europe/Moscow'
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSaveNotifications = () => {
    toast({
      title: "Настройки уведомлений сохранены",
      description: "Изменения вступят в силу немедленно.",
    });
  };

  const handleChangePassword = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Пароль изменен",
      description: "Ваш пароль успешно обновлен.",
    });

    setSecurity(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleToggleIntegration = (service: string) => {
    setIntegrations(prev => ({
      ...prev,
      [service]: !prev[service as keyof typeof prev]
    }));

    toast({
      title: "Интеграция обновлена",
      description: `Настройки подключения к ${service} изменены.`,
    });
  };

  const loginHistory = [
    { date: '15.12.2024, 09:30', device: 'Chrome, Windows', location: 'Москва', status: 'success' },
    { date: '14.12.2024, 18:45', device: 'Safari, iPhone', location: 'Москва', status: 'success' },
    { date: '13.12.2024, 12:15', device: 'Chrome, Windows', location: 'Москва', status: 'success' },
    { date: '12.12.2024, 08:20', device: 'Chrome, Windows', location: 'Москва', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Настройки</h1>
          <p className="text-gray-600">Управление параметрами аккаунта и приложения</p>
        </div>
        <Button variant="destructive" onClick={logout}>
          🚪 Выход
        </Button>
      </div>

      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Уведомления</CardTitle>
          <CardDescription>Настройте способы получения уведомлений</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5">
              <Label>Email уведомления</Label>
              <p className="text-sm text-gray-600">Получать уведомления на почту</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5">
              <Label>Push уведомления</Label>
              <p className="text-sm text-gray-600">Браузерные уведомления</p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Частота уведомлений</Label>
            <Select value={notifications.frequency} onValueChange={(value) => setNotifications(prev => ({ ...prev, frequency: value }))}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Ежедневно</SelectItem>
                <SelectItem value="weekly">Еженедельно</SelectItem>
                <SelectItem value="monthly">Ежемесячно</SelectItem>
                <SelectItem value="never">Никогда</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSaveNotifications}>
            Сохранить настройки уведомлений
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Безопасность</CardTitle>
          <CardDescription>Управление паролем и дополнительной защитой</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5">
              <Label>Двухфакторная аутентификация</Label>
              <p className="text-sm text-gray-600">Дополнительная защита аккаунта</p>
            </div>
            <Switch
              checked={security.twoFactor}
              onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, twoFactor: checked }))}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Смена пароля</h4>
            
            <div className="space-y-2">
              <Label htmlFor="current-password">Текущий пароль</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showPassword ? "text" : "password"}
                  value={security.currentPassword}
                  onChange={(e) => setSecurity(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Новый пароль</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={security.newPassword}
                  onChange={(e) => setSecurity(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Подтвердите пароль</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={security.confirmPassword}
                  onChange={(e) => setSecurity(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            <Button onClick={handleChangePassword}>
              Изменить пароль
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
