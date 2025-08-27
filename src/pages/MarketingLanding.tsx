import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const MarketingLanding = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6AFCBA] to-[#B6D9FC]">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#6AFCBA] to-[#B6D9FC] rounded-lg flex items-center justify-center text-white font-bold">
                B
              </div>
              <h1 className="text-xl font-bold">Benefit Admin</h1>
          </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => navigate('/login')}>
                Войти
              </Button>
              <Button variant="secondary" onClick={() => navigate('/register')}>
                Регистрация
              </Button>
              <Button onClick={() => navigate('/demo')}>
                Демо
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Управление корпоративными
            <span className="text-gray-900"> льготами</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Современная платформа для HR-менеджеров и сотрудников. 
            Кафетерий льгот с ИИ-аналитикой и персональными рекомендациями.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#82C4F8] text-white hover:bg-[#1D92C5]"
              onClick={() => navigate('/login')}
            >
              Начать работу
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/demo')}>
              Посмотреть демо
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Возможности платформы</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <CardTitle>Для сотрудников</CardTitle>
                <CardDescription>
                  Удобный выбор льгот, отслеживание баланса, персональная история
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Каталог из 10+ категорий льгот</li>
                  <li>• Гибкое распределение баллов</li>
                  <li>• История использования</li>
                  <li>• Поддержка 24/7</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle>Для HR</CardTitle>
                <CardDescription>
                  Полная аналитика, настройка лимитов, ИИ-рекомендации
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Дашборд с KPI</li>
                  <li>• Управление бюджетами</li>
                  <li>• Детекция аномалий</li>
                  <li>• Импорт данных</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <CardTitle>ИИ-аналитика</CardTitle>
                <CardDescription>
                  Умные рекомендации и оптимизация расходов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Персональные советы</li>
                  <li>• Прогнозирование трендов</li>
                  <li>• Автоматические отчеты</li>
                  <li>• Оптимизация бюджета</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>      

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#6AFCBA] to-[#B6D9FC] rounded-lg flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="font-semibold">Benefit Admin</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Benefit Admin. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketingLanding;
