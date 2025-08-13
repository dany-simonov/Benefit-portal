
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { benefitCategories } from '@/data/mockData';
import { formatNumber } from '@/lib/utils';

export function HRDashboard() {
  // Mock data for HR dashboard
  const totalEmployees = 156;
  const activeUsers = 142;
  const totalBudget = 5000000;
  const usedBudget = 3250000;
  const budgetUsagePercent = (usedBudget / totalBudget) * 100;

  const categoryStats = benefitCategories.map(category => ({
    ...category,
    employeeCount: Math.floor(Math.random() * 50) + 20,
    avgUsage: Math.floor(Math.random() * 30) + 40
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">HR Панель управления 📊</h1>
        <p className="text-purple-100 mt-1">Управление корпоративными льготами</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего сотрудников</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              Активных: {activeUsers}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Бюджет</CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalBudget)} ₽</div>
            <p className="text-xs text-muted-foreground">
              Использовано: {Math.round(budgetUsagePercent)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средняя активность</CardTitle>
            <span className="text-2xl">📈</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">
              +5% к прошлому месяцу
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Экономия</CardTitle>
            <span className="text-2xl">✨</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12%</div>
            <p className="text-xs text-muted-foreground">
              По сравнению с планом
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Использование бюджета</CardTitle>
          <CardDescription>
            Текущее состояние корпоративного бюджета на льготы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Потрачено из общего бюджета</span>
                <span className="font-medium">{formatNumber(usedBudget)} / {formatNumber(totalBudget)} ₽</span>
              </div>
              <Progress value={budgetUsagePercent} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{Math.round(budgetUsagePercent)}% использовано</span>
                <span>Остаток: {formatNumber(totalBudget - usedBudget)} ₽</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Аналитика по категориям</CardTitle>
          <CardDescription>
            Статистика использования льгот по категориям
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryStats.map((category) => {
              const usagePercent = (category.usedPoints / category.totalLimit) * 100;
              
              return (
                <div key={category.id} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    <div className="text-right space-x-2">
                      <Badge variant="outline">
                        {category.employeeCount} сотрудников
                      </Badge>
                      <Badge variant={usagePercent > 80 ? "destructive" : usagePercent > 50 ? "default" : "secondary"}>
                        {Math.round(usagePercent)}% использовано
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Лимит</p>
                      <p className="font-medium">{formatNumber(category.totalLimit)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Использовано</p>
                      <p className="font-medium text-blue-600">{formatNumber(category.usedPoints)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Средняя активность</p>
                      <p className="font-medium">{category.avgUsage}%</p>
                    </div>
                  </div>
                  
                  <Progress value={usagePercent} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">🔧 Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-blue-700">• Настроить лимиты категорий</p>
            <p className="text-blue-700">• Экспортировать отчет за месяц</p>
            <p className="text-blue-700">• Добавить новых сотрудников</p>
            <p className="text-blue-700">• Просмотреть аномалии использования</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">📈 Рекомендации системы</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-green-700">• Категория "Здоровье" недоиспользуется</p>
            <p className="text-green-700">• Рассмотрите увеличение лимита на транспорт</p>
            <p className="text-green-700">• 15% сотрудников не используют льготы</p>
            <p className="text-green-700">• Эффективность программы: 87%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
