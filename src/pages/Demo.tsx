import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const demoEmployee = {
  id: 'demo-employee',
  email: 'employee@company.com',
  name: 'Анна Сотрудникова',
  role: 'employee',
  department: 'Разработка',
  pointsBalance: 25000,
  avatar: '/placeholder.svg',
};
const demoHR = {
  id: 'demo-hr',
  email: 'hr@company.com',
  name: 'Мария HR-менеджер',
  role: 'hr',
  department: 'HR',
  pointsBalance: 0,
  avatar: '/placeholder.svg',
};

export default function Demo() {
  const navigate = useNavigate();

  const handleDemo = (role: 'employee' | 'hr') => {
    const user = role === 'employee' ? demoEmployee : demoHR;
    localStorage.setItem('demo-user', JSON.stringify(user));
    window.dispatchEvent(new Event('storage'));
    if (role === 'employee') {
      navigate('/employee/dashboard');
    } else {
      navigate('/hr/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#6AFCBA] to-[#B6D9FC] rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            B
          </div>
          <h1 className="text-2xl font-bold mb-2">Демо-режим</h1>
          <p className="text-gray-600 mb-4">Быстрое знакомство с платформой</p>
        </div>
        <Button className="w-full" size="lg" onClick={() => handleDemo('employee')}>
          👤 Демо сотрудника
        </Button>
        <Button className="w-full" size="lg" variant="outline" onClick={() => handleDemo('hr')}>
          🧑‍💼 Демо HR-менеджера
        </Button>
        <Button variant="ghost" className="w-full" onClick={() => navigate('/')}>← На главную</Button>
      </div>
    </div>
  );
} 