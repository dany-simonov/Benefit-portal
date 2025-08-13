
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Analytics = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Аналитика</h1>
          <p className="text-gray-600">Детальная аналитика использования льгот</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="quarter">Квартал</SelectItem>
              <SelectItem value="year">Год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            Экспорт
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Общие расходы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">2.4M ₽</div>
            <div className="text-sm text-green-600">+15% к прошлому месяцу</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Активные пользователи</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">1,234</div>
            <div className="text-sm text-green-600">+5% к прошлому месяцу</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Средний чек</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">1,945 ₽</div>
            <div className="text-sm text-red-600">-3% к прошлому месяцу</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Удовлетворённость</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">4.7/5</div>
            <div className="text-sm text-gray-600">На основе 456 отзывов</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Динамика расходов</CardTitle>
            <CardDescription>По месяцам за последний год</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📈</div>
                <div>График будет здесь</div>
                <div className="text-sm">(интеграция с Recharts)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Популярность категорий</CardTitle>
            <CardDescription>Распределение по типам льгот</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🥧</div>
                <div>Круговая диаграмма</div>
                <div className="text-sm">(интеграция с Recharts)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Анализ по отделам</CardTitle>
          <CardDescription>Сравнение использования льгот между отделами</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { dept: 'Разработка', employees: 45, spent: 890000, avg: 19800 },
              { dept: 'Маркетинг', employees: 23, spent: 456000, avg: 19800 },
              { dept: 'Продажи', employees: 67, spent: 1200000, avg: 17900 },
              { dept: 'HR', employees: 12, spent: 234000, avg: 19500 }
            ].map((dept) => (
              <div key={dept.dept} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{dept.dept}</h3>
                  <p className="text-sm text-gray-600">{dept.employees} сотрудников</p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Потрачено</p>
                    <p className="font-medium">{(dept.spent / 1000).toFixed(0)}K ₽</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Средний чек</p>
                    <p className="font-medium">{dept.avg.toLocaleString()} ₽</p>
                  </div>
                  <Badge variant="outline">
                    Эффективность: {Math.round(dept.spent / dept.employees / 1000)}K
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
