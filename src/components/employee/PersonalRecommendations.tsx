import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { mockRecommendations, mockPurchaseHistory, benefitCategories, type Recommendation } from '@/data/mockData';
import { formatNumber } from '@/lib/utils';

interface RecommendationFilters {
  category: string;
  priority: string;
  maxPrice: number;
  type: string;
}

export function PersonalRecommendations() {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [filters, setFilters] = useState<RecommendationFilters>({
    category: 'all',
    priority: 'all',
    maxPrice: 20000,
    type: 'all'
  });
  const [loading, setLoading] = useState(true);

  // Загрузка данных
  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);
      
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Загружаем историю из localStorage
      const userHistory = localStorage.getItem('user-purchase-history');
      if (!userHistory) {
        localStorage.setItem('user-purchase-history', JSON.stringify(mockPurchaseHistory));
      }
      
      setRecommendations(mockRecommendations);
      setLoading(false);
    };

    loadRecommendations();
  }, []);

  // Фильтрация рекомендаций
  const filteredRecommendations = recommendations.filter(rec => {
    if (filters.category !== 'all' && rec.categoryId !== filters.category) return false;
    if (filters.priority !== 'all' && rec.priority !== filters.priority) return false;
    if (filters.type !== 'all' && rec.type !== filters.type) return false;
    if (rec.price > filters.maxPrice) return false;
    return true;
  });

  // Обработчики действий с рекомендациями
  const handleLike = async (rec: Recommendation) => {
    // Сохраняем в localStorage
    const feedback = JSON.parse(localStorage.getItem('recommendation-feedback') || '{}');
    feedback[rec.id] = 'liked';
    localStorage.setItem('recommendation-feedback', JSON.stringify(feedback));
    
    toast({
      title: "Спасибо за отзыв!",
      description: "Ваше предпочтение учтено в алгоритме рекомендаций.",
    });
  };

  const handleDislike = async (rec: Recommendation) => {
    // Сохраняем в localStorage
    const feedback = JSON.parse(localStorage.getItem('recommendation-feedback') || '{}');
    feedback[rec.id] = 'disliked';
    localStorage.setItem('recommendation-feedback', JSON.stringify(feedback));
    
    toast({
      title: "Понятно!",
      description: "Эта рекомендация больше не будет показываться.",
    });
  };

  const handlePurchase = async (rec: Recommendation) => {
    toast({
      title: "Покупка оформлена!",
      description: `Льгота "${rec.title}" добавлена в корзину.`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'frequent': return '🔄';
      case 'similar': return '🔗';
      case 'department': return '👥';
      case 'new': return '🆕';
      case 'seasonal': return '🌤️';
      case 'budget': return '💰';
      default: return '💡';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'frequent': return 'Часто покупали';
      case 'similar': return 'Похожие льготы';
      case 'department': return 'Популярно в отделе';
      case 'new': return 'Новое предложение';
      case 'seasonal': return 'Сезонное';
      case 'budget': return 'Экономия';
      default: return type;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Персональные рекомендации</CardTitle>
          <CardDescription>Анализируем ваши предпочтения...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Загружаем рекомендации из базы данных...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Персональные рекомендации</h2>
          <p className="text-gray-600">На основе вашей истории покупок и предпочтений</p>
        </div>
        <Badge variant="secondary">AI-powered</Badge>
      </div>

      {/* Фильтры */}
      <Card>
        <CardHeader>
          <CardTitle>Фильтры</CardTitle>
          <CardDescription>Настройте отображение рекомендаций</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Категория</label>
              <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {benefitCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Приоритет</label>
              <Select value={filters.priority} onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все приоритеты</SelectItem>
                  <SelectItem value="high">Высокий</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="low">Низкий</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Тип рекомендации</label>
              <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="frequent">Часто покупали</SelectItem>
                  <SelectItem value="department">Популярно в отделе</SelectItem>
                  <SelectItem value="new">Новые предложения</SelectItem>
                  <SelectItem value="seasonal">Сезонные</SelectItem>
                  <SelectItem value="budget">Экономия</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Максимальная цена: {formatNumber(filters.maxPrice)} ₽</label>
              <Slider
                value={[filters.maxPrice]}
                onValueChange={(value) => setFilters(prev => ({ ...prev, maxPrice: value[0] }))}
                max={50000}
                min={1000}
                step={1000}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Рекомендации */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations.slice(0, 6).map((rec) => {
          const category = benefitCategories.find(c => c.id === rec.categoryId);
          
          return (
            <Card key={rec.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getTypeIcon(rec.type)}</span>
                    <Badge variant="outline" className="text-xs">
                      {getTypeText(rec.type)}
                    </Badge>
                  </div>
                  <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>
                    {rec.priority === 'high' ? 'Высокий' : rec.priority === 'medium' ? 'Средний' : 'Низкий'}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{rec.title}</CardTitle>
                <CardDescription className="text-sm">
                  {rec.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{category?.icon}</span>
                    <span className="text-sm text-gray-600">{category?.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{formatNumber(rec.price)} ₽</div>
                    <div className="text-sm text-gray-500">{formatNumber(rec.points)} баллов</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Уверенность:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${rec.confidence}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{rec.confidence}%</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  💡 {rec.data.reason}
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handlePurchase(rec)}
                  >
                    Купить
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleLike(rec)}
                  >
                    👍
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDislike(rec)}
                  >
                    👎
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRecommendations.length === 0 && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <p>По вашим фильтрам рекомендаций не найдено</p>
              <p className="text-sm">Попробуйте изменить параметры поиска</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 