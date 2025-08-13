
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface BenefitCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  pointLimit: number;
  providers: number;
}

const mockCategories: BenefitCategory[] = [
  {
    id: '1',
    name: 'Топливо',
    description: 'АЗС, заправки, топливные карты',
    icon: '⛽',
    color: 'bg-orange-500',
    isActive: true,
    pointLimit: 50000,
    providers: 8
  },
  {
    id: '2',
    name: 'Питание',
    description: 'Доставка еды, продукты, рестораны',
    icon: '🍽️',
    color: 'bg-green-500',
    isActive: true,
    pointLimit: 30000,
    providers: 12
  },
  {
    id: '3',
    name: 'Транспорт',
    description: 'Такси, каршеринг, общественный транспорт',
    icon: '🚗',
    color: 'bg-blue-500',
    isActive: true,
    pointLimit: 25000,
    providers: 6
  }
];

const BenefitConfig = () => {
  const [categories, setCategories] = useState(mockCategories);
  const { toast } = useToast();

  const handleToggleCategory = (id: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ));
    toast({
      title: "Настройки обновлены",
      description: "Изменения применены к категории льгот",
    });
  };

  const handleUpdateLimit = (id: string, newLimit: number) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, pointLimit: newLimit } : cat
    ));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Конфигурация льгот</h1>
          <p className="text-gray-600">Управление категориями и лимитами льгот</p>
        </div>
        <Button>
          Добавить категорию
        </Button>
      </div>

      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Глобальные настройки</CardTitle>
          <CardDescription>
            Общие параметры системы льгот
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="global-budget">Общий бюджет (руб.)</Label>
              <Input id="global-budget" type="number" defaultValue="5000000" />
            </div>
            <div>
              <Label htmlFor="reset-period">Период сброса</Label>
              <Input id="reset-period" defaultValue="6 месяцев" readOnly />
            </div>
            <div>
              <Label htmlFor="exchange-rate">Курс: руб за 1 балл</Label>
              <Input id="exchange-rate" type="number" step="0.01" defaultValue="1.00" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Категории льгот</CardTitle>
          <CardDescription>
            Настройка доступных категорий и их параметров
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">
                      {category.providers} партнёров
                    </Badge>
                    <Switch
                      checked={category.isActive}
                      onCheckedChange={() => handleToggleCategory(category.id)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`limit-${category.id}`}>Лимит баллов</Label>
                    <Input
                      id={`limit-${category.id}`}
                      type="number"
                      value={category.pointLimit}
                      onChange={(e) => handleUpdateLimit(category.id, Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Статус</Label>
                    <div className="mt-2">
                      <Badge variant={category.isActive ? 'default' : 'secondary'}>
                        {category.isActive ? 'Активна' : 'Отключена'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" size="sm">
                      Редактировать партнёров
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
};

export default BenefitConfig;
