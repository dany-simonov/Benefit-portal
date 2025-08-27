import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в Benefit Admin!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: "Проверьте учетные данные и попробуйте снова.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#6AFCBA] to-[#B6D9FC] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
            B
          </div>
          <CardTitle className="text-2xl font-bold">Benefit Admin</CardTitle>
          <CardDescription>
            Платформа управления корпоративными льготами
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </form>
          <div className="mt-6 text-sm text-gray-600 space-y-2">
            <p><strong>Демо аккаунты:</strong></p>
            <p>📧 employee@company.com - Сотрудник</p>
            <p>📧 hr@company.com - HR-менеджер</p>
            <p>🔑 Пароль: любой</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
