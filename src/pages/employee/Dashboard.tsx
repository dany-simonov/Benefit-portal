import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { benefitCategories, userAllocations, recentTransactions } from '@/data/mockData';
import { formatNumber } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { PersonalRecommendations } from '@/components/employee/PersonalRecommendations';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalAllocated = userAllocations.reduce((sum, allocation) => sum + allocation.allocatedPoints, 0);
  const totalUsed = userAllocations.reduce((sum, allocation) => sum + allocation.usedPoints, 0);
  const remainingPoints = user?.pointsBalance || 0;

  // Calculate days until next reset (mock data)
  const nextResetDate = new Date('2025-01-01');
  const today = new Date();
  const daysUntilReset = Math.ceil((nextResetDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
        <img src={user?.avatar} alt="avatar" className="w-20 h-20 rounded-full border" />
        <div>
          <h1 className="text-2xl font-bold">Добро пожаловать, {user?.name}! 👋</h1>
          <p className="text-gray-600">Email: {user?.email}</p>
          <p className="text-gray-600">Отдел: {user?.department}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">До обновления</CardTitle>
            <span className="text-2xl">⏰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {Math.abs(daysUntilReset)}
            </div>
            <p className="text-xs text-muted-foreground">
              дней осталось
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Активные льготы</CardTitle>
          <CardDescription>
            Текущее использование по категориям
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Последние операции</CardTitle>
            <CardDescription>
              История использования льгот
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.slice(0, 5).map((transaction) => {
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
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/employee/history')}>
              Посмотреть всю историю
            </Button>
            <Button variant="outline" className="w-full mt-2" onClick={() => navigate('/employee/recommendations')}>
              🤖 Все рекомендации
            </Button>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800">💡 Рекомендации</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-orange-700">
              <div className="p-3 bg-orange-100 rounded-lg">
                <p className="font-medium">Распределите оставшиеся баллы</p>
                <p className="text-sm">У вас осталось {formatNumber(remainingPoints)} неиспользованных баллов</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <p className="font-medium">Используйте категорию "Здоровье"</p>
                <p className="text-sm">Эта категория используется меньше всего</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <p className="font-medium">До обновления осталось {Math.abs(daysUntilReset)} дней</p>
                <p className="text-sm">Рекомендуем использовать баллы до 1 января 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Персональные рекомендации */}
      <PersonalRecommendations />

      <div className="flex items-center gap-4 cursor-pointer mb-6" onClick={() => navigate('/') }>
        <div className="w-8 h-8 bg-gradient-to-br from-[#6AFCBA] to-[#B6D9FC] rounded-lg flex items-center justify-center text-white font-bold">B</div>
        <span className="text-xl font-bold">Benefit Admin AI</span>
      </div>
    </div>
  );
};

export default Dashboard;
