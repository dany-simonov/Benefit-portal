import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { benefitCategories } from '@/data/mockData';
import { formatNumber } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const PointsAllocator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [allocations, setAllocations] = useState<Record<string, number>>({});

  const totalAvailable = user?.pointsBalance || 0;
  const totalAllocated = Object.values(allocations).reduce((sum, value) => sum + value, 0);
  const remaining = totalAvailable - totalAllocated;

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAllocationChange = (categoryId: string, value: number) => {
    setAllocations(prev => ({
      ...prev,
      [categoryId]: value
    }));
  };

  const handleConfirm = () => {
    // Сохраняем лимиты распределения в БД (localStorage)
    localStorage.setItem('benefit-allocations', JSON.stringify(allocations));
    toast({
      title: "Распределение сохранено",
      description: `Баллы успешно распределены по ${selectedCategories.length} категориям.`,
    });
    navigate('/employee/dashboard');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Выберите категории льгот</h2>
        <p className="text-gray-600">Отметьте категории, которые вас интересуют</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {benefitCategories.map((category) => (
          <Card 
            key={category.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedCategories.includes(category.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => handleCategoryToggle(category.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                  {category.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription className="text-sm">
                    Лимит: {formatNumber(category.totalLimit)} баллов
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{category.description}</p>
              <Badge variant="outline" className="mt-2">
                {category.providers.length} партнеров
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate('/employee/dashboard')}>
          Отмена
        </Button>
        <Button 
          onClick={() => setCurrentStep(2)}
          disabled={selectedCategories.length === 0}
        >
          Далее ({selectedCategories.length} выбрано)
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Распределите баллы</h2>
        <p className="text-gray-600">Укажите, сколько баллов потратить на каждую категорию</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Баланс баллов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <span>Доступно:</span>
            <span className="font-bold text-2xl">{formatNumber(totalAvailable)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span>Распределено:</span>
            <span className="font-bold text-blue-600">{formatNumber(totalAllocated)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Остаток:</span>
            <span className={`font-bold text-2xl ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>{formatNumber(remaining)}</span>
          </div>
          <Progress value={(totalAllocated / totalAvailable) * 100} className="mt-4" />
        </CardContent>
      </Card>

      <div className="space-y-6">
        {selectedCategories.map((categoryId) => {
          const category = benefitCategories.find(c => c.id === categoryId);
          if (!category) return null;
          const currentAllocation = allocations[categoryId] || 0;
          const maxAllocation = category.totalLimit;
          return (
            <Card key={categoryId}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>
                      Лимит: {formatNumber(category.totalLimit)} баллов
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Распределить баллов</Label>
                    <span className="text-sm font-medium">{formatNumber(currentAllocation)}</span>
                  </div>
                  <Slider
                    value={[currentAllocation]}
                    onValueChange={([value]) => handleAllocationChange(categoryId, value)}
                    max={maxAllocation}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>{formatNumber(maxAllocation)}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    value={currentAllocation}
                    onChange={(e) => handleAllocationChange(categoryId, Number(e.target.value))}
                    max={maxAllocation}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleAllocationChange(categoryId, maxAllocation)}
                    disabled={maxAllocation === 0}
                  >
                    Максимум
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {remaining < 0 && (
        <div className="text-red-600 text-center font-semibold">Сумма превышает доступный баланс!</div>
      )}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          Назад
        </Button>
        <Button onClick={handleConfirm} disabled={remaining < 0}>
          Подтвердить
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Подтверждение</h2>
        <p className="text-gray-600">Проверьте распределение баллов</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Итого</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedCategories.map((categoryId) => {
              const category = benefitCategories.find(c => c.id === categoryId);
              const allocation = allocations[categoryId] || 0;
              
              if (!category || allocation === 0) return null;

              return (
                <div key={categoryId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="font-bold">{formatNumber(allocation)} баллов</span>
                </div>
              );
            })}
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Итого распределено:</span>
                <span className="font-bold text-xl text-blue-600">
                  {formatNumber(totalAllocated)} баллов
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(2)}>
          Назад
        </Button>
        <Button onClick={handleConfirm}>
          Подтвердить распределение
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              <span className={`ml-2 ${step <= currentStep ? 'text-blue-600' : 'text-gray-600'}`}>
                {step === 1 ? 'Выбор' : step === 2 ? 'Распределение' : 'Подтверждение'}
              </span>
              {step < 3 && <div className="w-16 h-px bg-gray-300 mx-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
    </div>
  );
};

export default PointsAllocator;
