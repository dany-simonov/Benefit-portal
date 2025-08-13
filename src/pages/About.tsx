import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';

const features = [
  {
    icon: '🤖',
    title: 'ИИ-аналитика',
    desc: 'Умные рекомендации и автоматизация HR-процессов.'
  },
  {
    icon: '⚡',
    title: 'Мгновенный отклик',
    desc: 'Быстрая работа интерфейса и моментальные обновления.'
  },
  {
    icon: '🔒',
    title: 'Безопасность',
    desc: 'Надёжное хранение данных и защищённые маршруты.'
  },
  {
    icon: '🎨',
    title: 'Современный дизайн',
    desc: 'Стильный UI на базе Tailwind и shadcn.'
  },
  {
    icon: '🧑‍💻',
    title: 'Открытый код',
    desc: 'Лёгкая кастомизация и расширяемость.'
  },
];

const techs = [
  { name: 'Vite', desc: 'Молниеносная сборка и dev-сервер', icon: '⚡' },
  { name: 'React', desc: 'Современный UI-фреймворк', icon: '⚛️' },
  { name: 'TypeScript', desc: 'Строгая типизация', icon: '🟦' },
  { name: 'Tailwind CSS', desc: 'Ультра-стильные и быстрые стили', icon: '🌈' },
  { name: 'shadcn/ui', desc: 'Кастомные UI-компоненты', icon: '🧩' },
  { name: 'React Query', desc: 'Асинхронные запросы и кэш', icon: '🔄' },
  { name: 'Radix UI', desc: 'Доступные и гибкие компоненты', icon: '🧱' },
  { name: 'Zod', desc: 'Валидация данных', icon: '🛡️' },
  { name: 'date-fns', desc: 'Работа с датами', icon: '📅' },
  { name: 'Recharts', desc: 'Графики и аналитика', icon: '📊' },
];

function TechSlider() {
  const [index, setIndex] = useState(0);
  const visible = 3;
  const max = techs.length - visible;
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <button
          className="p-2 rounded-full bg-blue-100 text-blue-700 disabled:opacity-30"
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          ←
        </button>
        <button
          className="p-2 rounded-full bg-blue-100 text-blue-700 disabled:opacity-30"
          onClick={() => setIndex(i => Math.min(max, i + 1))}
          disabled={index === max}
        >
          →
        </button>
      </div>
      <div className="flex gap-6 overflow-hidden">
        {techs.slice(index, index + visible).map(t => (
          <div key={t.name} className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col items-center min-w-[220px] transition-all duration-300">
            <div className="text-4xl mb-3">{t.icon}</div>
            <div className="font-bold text-lg mb-1">{t.name}</div>
            <div className="text-gray-600 text-sm text-center">{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/') }>
              <div className="w-8 h-8 bg-gradient-to-br from-[#6AFCBA] to-[#B6D9FC] rounded-lg flex items-center justify-center text-white font-bold">
                B
              </div>
              <h1 className="text-xl font-bold">Benefit Admin AI</h1>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>На главную</Button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">О платформе Benefit Admin AI</h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Benefit Admin AI — это современная платформа для управления корпоративными льготами, созданная для HR-менеджеров и сотрудников. Мы объединяем лучшие технологии, чтобы сделать работу с льготами удобной, прозрачной и эффективной.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <div className="font-bold text-lg mb-1">{f.title}</div>
                <div className="text-gray-600 text-sm">{f.desc}</div>
              </div>
            ))}
          </div>
          <h3 className="text-2xl font-bold mb-4">Технологии</h3>
          <TechSlider />
          <Button size="lg" onClick={() => navigate('/register')}>
            Присоединиться
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/') }>
              <div className="w-8 h-8 bg-gradient-to-br from-[#6AFCBA] to-[#B6D9FC] rounded-lg flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="font-semibold">Benefit Admin AI</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Benefit Admin AI. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 