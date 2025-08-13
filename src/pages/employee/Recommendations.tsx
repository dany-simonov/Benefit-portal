import React from 'react';
import { PersonalRecommendations } from '@/components/employee/PersonalRecommendations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Recommendations = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Мои рекомендации</h1>
          <p className="text-gray-600">Персонализированные предложения на основе вашего поведения</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="secondary">AI-powered</Badge>
          <Badge variant="outline">Обновлено сегодня</Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего рекомендаций</CardTitle>
            <span className="text-2xl">💡</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 новых сегодня
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Точность</CardTitle>
            <span className="text-2xl">🎯</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">89%</div>
            <p className="text-xs text-muted-foreground">
              На основе ваших отзывов
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Использовано</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-xs text-muted-foreground">
              За последний месяц
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Экономия</CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">15K ₽</div>
            <p className="text-xs text-muted-foreground">
              Благодаря рекомендациям
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Recommendations Component */}
      <PersonalRecommendations />

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle>🤖 Как работают рекомендации</CardTitle>
          <CardDescription>
            Наш ИИ анализирует ваши предпочтения и предлагает персональные льготы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-medium mb-2">Анализ истории</h4>
              <p className="text-sm text-gray-600">
                Изучаем ваши покупки, частоту использования и предпочтения
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🧠</span>
              </div>
              <h4 className="font-medium mb-2">Машинное обучение</h4>
              <p className="text-sm text-gray-600">
                Алгоритм находит паттерны и предсказывает ваши интересы
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-medium mb-2">Персональные советы</h4>
              <p className="text-sm text-gray-600">
                Получаете рекомендации, которые действительно подходят именно вам
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recommendations; 