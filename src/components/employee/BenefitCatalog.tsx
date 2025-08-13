import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { benefitCategories, mockRecommendations } from '@/data/mockData';
import { formatNumber } from '@/lib/utils';

export function BenefitCatalog() {
  // Получаем лимиты распределения из БД (localStorage)
  let allocations: Record<string, number> = {};
  try {
    const saved = localStorage.getItem('benefit-allocations');
    if (saved) allocations = JSON.parse(saved);
  } catch (error) {
    console.log('Ошибка загрузки лимитов:', error);
  }
  const [selected, setSelected] = useState(null);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Каталог льгот</h1>
          <p className="text-gray-600">Обзор доступных категорий льгот</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefitCategories.map((category) => {
          // Если есть лимит из БД — используем его
          const userLimit = allocations[category.id] ?? category.totalLimit;
          const usagePercent = (category.usedPoints / userLimit) * 100;
          return (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Использовано</span>
                      <span>{Math.round(usagePercent)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${usagePercent}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{formatNumber(category.usedPoints)}</span>
                      <span>{formatNumber(userLimit)}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p><strong>Партнеры:</strong> {category.providers.length}</p>
                    <p><strong>Доступно:</strong> {formatNumber(userLimit - category.usedPoints)} баллов</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setSelected(category)}>
                    Подробнее
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8 relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setSelected(null)}>&times;</button>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 ${selected.color} rounded-lg flex items-center justify-center text-white text-2xl`}>{selected.icon}</div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{selected.name}</h2>
                <div className="text-gray-600">{selected.description}</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">Партнеры:</div>
              <ul className="space-y-2">
                {selected.providers.map((p) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <img src={p.logo} alt={p.name} className="w-8 h-8 rounded" />
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.description}</div>
                      <div className="text-xs text-gray-400">Мин. баллов: {p.minPoints}, Макс. баллов: {p.maxPoints}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4">
              <div>
                <div className="text-xs text-gray-500">Лимит</div>
                <div className="font-bold">{formatNumber(allocations[selected.id] ?? selected.totalLimit)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Использовано</div>
                <div className="font-bold">{formatNumber(selected.usedPoints)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Доступно</div>
                <div className="font-bold">{formatNumber((allocations[selected.id] ?? selected.totalLimit) - selected.usedPoints)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Рекомендуемые льготы */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Рекомендуемые для вас</CardTitle>
          <CardDescription>На основе вашей истории покупок</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockRecommendations.slice(0, 3).map((rec) => {
              const category = benefitCategories.find(c => c.id === rec.categoryId);
              return (
                <Card key={rec.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{category?.icon}</span>
                        <Badge variant="outline" className="text-xs">
                          {rec.confidence}% совпадение
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">{formatNumber(rec.points)} баллов</span>
                    </div>
                    <h4 className="font-medium mb-1">{rec.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-green-600">{formatNumber(rec.price)} ₽</span>
                      <Button size="sm">Попробовать</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
