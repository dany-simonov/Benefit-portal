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
      <div className="flex justify-between items-center">
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
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email уведомления</Label>
              <p className="text-sm text-gray-600">Получать уведомления на почту</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
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
          <div className="flex items-center justify-between">
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
              <Input
                id="current-password"
                type="password"
                value={security.currentPassword}
                onChange={(e) => setSecurity(prev => ({ ...prev, currentPassword: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Новый пароль</Label>
              <Input
                id="new-password"
                type="password"
                value={security.newPassword}
                onChange={(e) => setSecurity(prev => ({ ...prev, newPassword: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Подтвердите пароль</Label>
              <Input
                id="confirm-password"
                type="password"
                value={security.confirmPassword}
                onChange={(e) => setSecurity(prev => ({ ...prev, confirmPassword: e.target.value }))}
              />
            </div>

            <Button onClick={handleChangePassword}>
              Изменить пароль
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Общие настройки</CardTitle>
          <CardDescription>Язык интерфейса и часовой пояс</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Язык интерфейса</Label>
              <Select value={general.language} onValueChange={(value) => setGeneral(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Часовой пояс</Label>
              <Select value={general.timezone} onValueChange={(value) => setGeneral(prev => ({ ...prev, timezone: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Moscow">Москва (UTC+3)</SelectItem>
                  <SelectItem value="Europe/Samara">Самара (UTC+4)</SelectItem>
                  <SelectItem value="Asia/Yekaterinburg">Екатеринбург (UTC+5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle>История входов</CardTitle>
          <CardDescription>Последние сеансы в системе</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loginHistory.map((login, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <div>
                    <p className="font-medium">{login.device}</p>
                    <p className="text-sm text-gray-600">{login.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline">
                    {login.location}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
