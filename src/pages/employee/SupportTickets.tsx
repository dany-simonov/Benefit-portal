import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'pending' | 'resolved';
  date: string;
  description: string;
}

const mockTickets: Ticket[] = [
  {
    id: '001',
    subject: 'Не могу воспользоваться льготой на топливо',
    status: 'pending',
    date: '2024-01-15',
    description: 'При попытке использовать баллы на АЗС возникает ошибка'
  },
  {
    id: '002',
    subject: 'Вопрос по начислению баллов',
    status: 'resolved',
    date: '2024-01-10',
    description: 'Не понимаю, почему начислено меньше баллов'
  }
];

const SupportTickets = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена",
      description: "Мы ответим в течение 24 часов",
    });
    setSubject('');
    setDescription('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Открыта';
      case 'pending': return 'В обработке';
      case 'resolved': return 'Решена';
      default: return status;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Поддержка</h1>
        <p className="text-gray-600">Создайте заявку или отслеживайте существующие</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* New Ticket Form */}
        <Card>
          <CardHeader>
            <CardTitle>Создать заявку</CardTitle>
            <CardDescription>
              Опишите вашу проблему, и мы поможем её решить
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Тема</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Кратко опишите проблему"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Описание</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Подробно опишите вашу проблему..."
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Отправить заявку
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Мои заявки</CardTitle>
            <CardDescription>
              История ваших обращений в поддержку
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{ticket.subject}</h3>
                    <Badge className={getStatusColor(ticket.status)}>
                      {getStatusText(ticket.status)}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{ticket.description}</p>
                  <p className="text-xs text-gray-500">#{ticket.id} • {ticket.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportTickets;
