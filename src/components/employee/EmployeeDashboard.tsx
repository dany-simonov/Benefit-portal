import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { benefitCategories, userAllocations, recentTransactions } from '@/data/mockData';
import { formatNumber } from '@/lib/utils';

export function EmployeeDashboard() {
  const { user } = useAuth();

  const totalAllocated = userAllocations.reduce((sum, allocation) => sum + allocation.allocatedPoints, 0);
  const totalUsed = userAllocations.reduce((sum, allocation) => sum + allocation.usedPoints, 0);
  const remainingPoints = user?.pointsBalance || 0;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#6AFCBA] to-[#B6D9FC] text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">Добро пожаловать, {user?.name}! 👋</h1>
        <p className="text-blue-100 mt-1">Управляйте своими корпоративными льготами</p>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Баланс баллов</CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatNumber(remainingPoints)}
            </div>
            <p className="text-xs text-muted-foreground">
              Доступно для использования
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Распределено</CardTitle>
            <span className="text-2xl">📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatNumber(totalAllocated)}
            </div>
            <p className="text-xs text-muted-foreground">
              По категориям льгот
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Использовано</CardTitle>
            <span className="text-2xl">✨</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatNumber(totalUsed)}
            </div>
            <p className="text-xs text-muted-foreground">
              В этом месяце
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Мои льготы</CardTitle>
          <CardDescription>
            Текущее распределение баллов по категориям
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userAllocations.map((allocation) => {
              const category = benefitCategories.find(c => c.id === allocation.categoryId);
              if (!category) return null;

              const usagePercent = (allocation.usedPoints / allocation.allocatedPoints) * 100;
              
              return (
                <div key={allocation.categoryId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">
                        {formatNumber(allocation.usedPoints)} / {formatNumber(allocation.allocatedPoints)}
                      </span>
                      <Badge variant={usagePercent > 80 ? "destructive" : usagePercent > 50 ? "default" : "secondary"} className="ml-2">
                        {Math.round(usagePercent)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={usagePercent} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Последние операции</CardTitle>
          <CardDescription>
            История использования льгот
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => {
              const category = benefitCategories.find(c => c.id === transaction.categoryId);
              
              return (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category?.icon}</span>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-600">
                        {transaction.date.toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">
                      -{formatNumber(transaction.points)} баллов
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatNumber(transaction.amount)} ₽
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-orange-800">💡 Рекомендации</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-orange-700">
            <p>• У вас осталось {formatNumber(remainingPoints)} неиспользованных баллов</p>
            <p>• Рекомендуем распределить их до конца месяца</p>
            <p>• Категория "Здоровье" используется меньше всего</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
