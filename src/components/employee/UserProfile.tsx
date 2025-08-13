
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { benefitCategories } from '@/data/mockData';
import { formatNumber } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function UserProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+7 (999) 123-45-67',
    city: 'Москва',
    department: user?.department || '',
  });

  const [preferences, setPreferences] = useState({
    transport: true,
    food: true,
    health: false,
    education: true,
    entertainment: false,
  });

  const handleSaveProfile = () => {
    toast({
      title: "Профиль обновлен",
      description: "Ваши данные успешно сохранены.",
    });
    setIsEditing(false);
  };

  const handlePreferenceChange = (categoryId: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [categoryId]: checked
    }));
  };

  const pointsHistory = [
    { date: '01.12.2024', amount: 25000, type: 'Начисление', description: 'Ежемесячное начисление' },
    { date: '01.11.2024', amount: 25000, type: 'Начисление', description: 'Ежемесячное начисление' },
    { date: '15.10.2024', amount: 5000, type: 'Бонус', description: 'За достижение целей' },
    { date: '01.10.2024', amount: 25000, type: 'Начисление', description: 'Ежемесячное начисление' },
  ];

  const frequentBenefits = [
    { category: 'transport', name: 'Яндекс.Такси', usage: '15 раз' },
    { category: 'food', name: 'Delivery Club', usage: '8 раз' },
    { category: 'transport', name: 'Каршеринг', usage: '5 раз' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Мой профиль</h1>
          <p className="text-gray-600">Управление личными данными и настройками</p>
        </div>
        <Button 
          onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? '💾 Сохранить' : '✏️ Редактировать'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Личные данные</CardTitle>
            <CardDescription>Основная информация о профиле</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">ФИО</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Город</Label>
                <Input
                  id="city"
                  value={profileData.city}
                  onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Отдел</Label>
                <Input
                  id="department"
                  value={profileData.department}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label>Статус</Label>
                <div>
                  <Badge variant="default">Активный сотрудник</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Info */}
        <Card>
          <CardHeader>
            <CardTitle>Баланс баллов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600">
                {formatNumber(user?.pointsBalance || 0)}
              </div>
              <p className="text-sm text-gray-600">Доступно баллов</p>
              <Badge variant="secondary" className="text-xs">
                Обновлено сегодня
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Points History */}
      <Card>
        <CardHeader>
          <CardTitle>История начислений</CardTitle>
          <CardDescription>Последние поступления баллов на счет</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pointsHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">+</span>
                  </div>
                  <div>
                    <p className="font-medium">{item.description}</p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">
                    +{formatNumber(item.amount)} баллов
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preferred Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Предпочитаемые категории</CardTitle>
          <CardDescription>Выберите категории льгот, которые вас интересуют больше всего</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={category.id}
                  checked={preferences[category.id as keyof typeof preferences]}
                  onCheckedChange={(checked) => handlePreferenceChange(category.id, checked as boolean)}
                />
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{category.icon}</span>
                  <label htmlFor={category.id} className="text-sm font-medium cursor-pointer">
                    {category.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Frequent Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Часто используемые льготы</CardTitle>
          <CardDescription>Автоматически формируется на основе вашей истории</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {frequentBenefits.map((benefit, index) => {
              const category = benefitCategories.find(c => c.id === benefit.category);
              
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category?.icon}</span>
                    <div>
                      <p className="font-medium">{benefit.name}</p>
                      <p className="text-sm text-gray-600">{category?.name}</p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {benefit.usage}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
