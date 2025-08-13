import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Satisfaction() {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');
  const [sent, setSent] = useState(false);
  const [last, setLast] = useState<{value: number, comment: string} | null>(null);

  useEffect(() => {
    // Получаем последнее значение из БД (localStorage)
    const saved = localStorage.getItem('satisfaction-feedback');
    if (saved) {
      setLast(JSON.parse(saved));
    }
  }, [sent]);

  const handleSend = () => {
    // Сохраняем отзыв в БД (localStorage)
    localStorage.setItem('satisfaction-feedback', JSON.stringify({ value, comment }));
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#B6D9FC] flex items-center justify-center p-4">
      <Card className="max-w-md w-full mx-auto shadow-xl">
        <CardHeader className="flex flex-col items-center">
          {/* Фирменная иконка */}
          <div className="w-16 h-16 mb-2 bg-gradient-to-br from-[#6AFCBA] to-[#B6D9FC] rounded-full flex items-center justify-center">
            <span className="text-4xl">🙂</span>
          </div>
          <CardTitle className="text-[#1D92C5] text-2xl font-bold">Удовлетворенность сервисом</CardTitle>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center text-[#1D92C5] font-semibold py-8">
              Спасибо за ваш отзыв!<br/>
              {last && (
                <div className="mt-4 text-base text-gray-700">
                  Ваша оценка: <span className="font-bold text-[#6AFCBA]">{last.value}</span><br/>
                  Комментарий: <span className="italic">{last.comment || '—'}</span>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="mb-6 text-lg text-gray-700">Оцените, насколько вы довольны сервисом:</div>
              <div className="flex justify-center gap-2 mb-6">
                {[1,2,3,4,5].map(n => (
                  <button
                    key={n}
                    className={`w-10 h-10 rounded-full text-2xl font-bold border-2 transition-all ${value === n ? 'bg-[#6AFCBA] border-[#1D92C5] text-white' : 'bg-white border-[#B6D9FC] text-[#1D92C5] hover:bg-[#B6D9FC]'}`}
                    onClick={() => setValue(n)}
                  >{n}</button>
                ))}
              </div>
              <textarea
                className="w-full min-h-[80px] rounded-lg border border-[#B6D9FC] p-2 mb-6 text-[#1D92C5] focus:outline-none focus:border-[#6AFCBA]"
                placeholder="Оставьте комментарий (необязательно)"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <Button
                className="w-full bg-[#6AFCBA] text-white hover:bg-[#1D92C5]"
                disabled={value === 0}
                onClick={handleSend}
              >
                Отправить
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 