
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  pointsBalance: number;
  pointsUsed: number;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Анна Сотрудникова',
    email: 'anna@company.com',
    department: 'Разработка',
    pointsBalance: 25000,
    pointsUsed: 15000,
    status: 'active',
    lastLogin: '2024-01-15'
  },
  {
    id: '2',
    name: 'Петр Иванов',
    email: 'petr@company.com',
    department: 'Маркетинг',
    pointsBalance: 18000,
    pointsUsed: 22000,
    status: 'active',
    lastLogin: '2024-01-14'
  },
  {
    id: '3',
    name: 'Мария Петрова',
    email: 'maria@company.com',
    department: 'HR',
    pointsBalance: 30000,
    pointsUsed: 10000,
    status: 'inactive',
    lastLogin: '2024-01-10'
  }
];

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees] = useState(mockEmployees);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Сотрудники</h1>
          <p className="text-gray-600">Управление балансами и настройками сотрудников</p>
        </div>
        <Button>
          Добавить сотрудника
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Поиск и фильтры</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Поиск по имени, email или отделу..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">Фильтры</Button>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Список сотрудников</CardTitle>
          <CardDescription>
            Всего сотрудников: {filteredEmployees.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg`} alt={employee.name} />
                    <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.email}</p>
                    <p className="text-xs text-gray-500">{employee.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Баланс</p>
                    <p className="font-medium">{formatNumber(employee.pointsBalance)}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Использовано</p>
                    <p className="font-medium">{formatNumber(employee.pointsUsed)}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Статус</p>
                    <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                      {employee.status === 'active' ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Последний вход</p>
                    <p className="text-xs">{employee.lastLogin}</p>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Редактировать
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeTable;
