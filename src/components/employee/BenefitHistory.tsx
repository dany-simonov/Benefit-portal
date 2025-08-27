import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { recentTransactions, benefitCategories } from '@/data/mockData';
import { formatNumber } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function BenefitHistory() {
  // Получаем лимиты распределения из БД (localStorage)
  let allocations: Record<string, number> = {};
  try {
    const saved = localStorage.getItem('benefit-allocations');
    if (saved) allocations = JSON.parse(saved);
  // eslint-disable-next-line no-empty
  } catch {}
  const { toast } = useToast();
  const [periodFilter, setPeriodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleExportExcel = () => {
    toast({
      title: "Экспорт запущен",
      description: "Файл Excel будет загружен в течение нескольких секунд.",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      pending: 'secondary',
      failed: 'destructive'
    } as const;
    
    const labels = {
      completed: 'Выполнено',
      pending: 'В обработке',
      failed: 'Отклонено'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">История льгот</h1>
          <p className="text-gray-600">Отслеживайте использование ваших корпоративных льгот</p>
        </div>
        <Button onClick={handleExportExcel} variant="outline">
          📊 Экспорт в Excel
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Фильтры</CardTitle>
          <CardDescription>Настройте отображение истории операций</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Период</Label>
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все время</SelectItem>
                  <SelectItem value="week">Эта неделя</SelectItem>
                  <SelectItem value="month">Этот месяц</SelectItem>
                  <SelectItem value="quarter">Этот квартал</SelectItem>
                  <SelectItem value="year">Этот год</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Статус</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="completed">Выполнено</SelectItem>
                  <SelectItem value="pending">В обработке</SelectItem>
                  <SelectItem value="failed">Отклонено</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Категория</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {benefitCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Поиск</Label>
              <Input placeholder="Поиск по описанию..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {benefitCategories.slice(0, 3).map((category) => {
          // Если есть лимит из БД — используем его
          const userLimit = allocations[category.id] ?? category.totalLimit;
          const usagePercent = (category.usedPoints / userLimit) * 100;
          return (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{category.icon}</span>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Использовано</span>
                    <span>{Math.round(usagePercent)}%</span>
                  </div>
                  <Progress value={usagePercent} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{formatNumber(category.usedPoints)}</span>
                    <span>{formatNumber(userLimit)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>История операций</CardTitle>
          <CardDescription>Детальная информация о всех операциях</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead>Баллы</TableHead>
                <TableHead className="hidden sm:table-cell">Сумма</TableHead>
                <TableHead className="hidden sm:table-cell">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => {
                const category = benefitCategories.find(c => c.id === transaction.categoryId);
                // Если есть лимит из БД — используем его
                const userLimit = allocations[category?.id ?? ''] ?? category?.totalLimit;
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {transaction.date.toLocaleDateString('ru-RU')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{category?.icon}</span>
                        <span>{category?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-red-600 font-medium">
                      -{formatNumber(transaction.points)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{formatNumber(transaction.amount)} ₽</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Timeline View (Optional) */}
      <Card>
        <CardHeader>
          <CardTitle>Временная шкала</CardTitle>
          <CardDescription>Визуальное представление истории операций</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => {
              const category = benefitCategories.find(c => c.id === transaction.categoryId);
              // Если есть лимит из БД — используем его
              const userLimit = allocations[category?.id ?? ''] ?? category?.totalLimit;
              return (
                <div key={transaction.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{category?.icon}</span>
                    </div>
                    {index < recentTransactions.length - 1 && (
                      <div className="w-px h-6 bg-gray-200 ml-5 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {transaction.date.toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{category?.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-medium text-red-600">
                        -{formatNumber(transaction.points)} баллов
                      </span>
                      <span className="text-sm text-gray-500">
                        ({formatNumber(transaction.amount)} ₽)
                      </span>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
