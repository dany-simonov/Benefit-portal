import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const HrSettings = () => {
  const [apiKey, setApiKey] = useState('sk-proj-••••••••••••••••');
  const [webhookUrl, setWebhookUrl] = useState('https://company.com/api/benefits-webhook');
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Настройки сохранены",
      description: "Изменения применены успешно",
    });
  };

  const handleGenerateApiKey = () => {
    const newKey = 'sk-proj-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    toast({
      title: "API ключ сгенерирован",
      description: "Новый ключ создан и сохранён в системе.",
    });
  };

  const handleEditUser = (userName: string) => {
    toast({
      title: "Редактирование пользователя",
      description: `Открываю форму редактирования для ${userName}`,
    });
  };

  const handleAddUser = () => {
    toast({
      title: "Добавление пользователя",
      description: "Открываю форму для добавления нового HR-менеджера.",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Настройки HR</h1>
        <p className="text-gray-600">Конфигурация системы и интеграций</p>
      </div>

      {/* Company Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Настройки компании</CardTitle>
          <CardDescription>
            Основная информация о компании и системе льгот
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company-name">Название компании</Label>
              <Input id="company-name" defaultValue="ООО 'Технологии Будущего'" />
            </div>
            <div>
              <Label htmlFor="company-inn">ИНН</Label>
              <Input id="company-inn" defaultValue="7701234567" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="company-address">Адрес</Label>
            <Textarea 
              id="company-address" 
              defaultValue="Москва, ул. Примерная, д. 123, офис 456"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-email">Email для уведомлений</Label>
              <Input id="contact-email" type="email" defaultValue="hr@company.com" />
            </div>
            <div>
              <Label htmlFor="contact-phone">Телефон поддержки</Label>
              <Input id="contact-phone" defaultValue="+7 (495) 123-45-67" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>API и интеграции</CardTitle>
          <CardDescription>
            Настройка внешних интеграций и API-ключей
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="api-key">API ключ для внешних сервисов</Label>
            <div className="flex space-x-2">
              <Input 
                id="api-key" 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" onClick={handleGenerateApiKey}>
                Сгенерировать
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input 
              id="webhook-url" 
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-domain.com/webhook"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Синхронизация с 1C</Label>
                <p className="text-sm text-gray-600">Автоматическая выгрузка в учётную систему</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Email уведомления</Label>
                <p className="text-sm text-gray-600">Отправка отчётов на email</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>Управление пользователями</CardTitle>
          <CardDescription>
            Роли и права доступа HR-менеджеров
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Мария HR-менеджер', email: 'maria@company.com', role: 'Администратор', status: 'active' },
              { name: 'Анна Помощник', email: 'anna.assistant@company.com', role: 'Менеджер', status: 'active' },
              { name: 'Петр Аналитик', email: 'petr.analytics@company.com', role: 'Аналитик', status: 'inactive' }
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">{user.role}</Badge>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status === 'active' ? 'Активен' : 'Неактивен'}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditUser(user.name)}
                  >
                    Изменить
                  </Button>
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full hover:shadow-md transition-shadow"
              onClick={handleAddUser}
            >
              Добавить пользователя
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Системные настройки</CardTitle>
          <CardDescription>
            Общие параметры работы системы
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Логирование действий</Label>
                <p className="text-sm text-gray-600">Детальные логи всех операций</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Автобэкап</Label>
                <p className="text-sm text-gray-600">Ежедневное резервное копирование</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="session-timeout">Таймаут сессии (минуты)</Label>
              <Input id="session-timeout" type="number" defaultValue="30" />
            </div>
            <div>
              <Label htmlFor="max-file-size">Максимальный размер файла (MB)</Label>
              <Input id="max-file-size" type="number" defaultValue="10" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave}>
          Сохранить все настройки
        </Button>
      </div>
    </div>
  );
};

export default HrSettings;
