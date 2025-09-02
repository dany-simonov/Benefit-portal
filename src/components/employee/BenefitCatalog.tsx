import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CATEGORY_TABS, BENEFITS, type BenefitCategoryKey, type BenefitItem } from '@/data/benefitsCatalog';
import { formatNumber } from '@/lib/utils';

export function BenefitCatalog() {
  const [activeTab, setActiveTab] = useState<BenefitCategoryKey>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<BenefitItem | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BENEFITS.filter(b => {
      const byCat = activeTab === 'all' || b.category === activeTab;
      const byQuery = !q || [b.name, b.shortDescription].some(t => t.toLowerCase().includes(q));
      return byCat && byQuery;
    });
  }, [activeTab, query]);

  const categoryStats = useMemo(() => {
    const map: Record<BenefitCategoryKey, { count: number; partners: number }> = {
      all: { count: BENEFITS.length, partners: BENEFITS.reduce((s, b) => s + (b.stats.partners || 0), 0) },
      health: { count: 0, partners: 0 },
      mindfulness: { count: 0, partners: 0 },
      adulthood: { count: 0, partners: 0 },
      products: { count: 0, partners: 0 },
      travel: { count: 0, partners: 0 },
      mobility: { count: 0, partners: 0 },
      auto: { count: 0, partners: 0 },
      education: { count: 0, partners: 0 },
    };
    for (const b of BENEFITS) {
      if (map[b.category]) {
        map[b.category].count += 1;
        map[b.category].partners += b.stats.partners || 0;
      }
    }
    return map;
  }, []);

  return (
    <div className="space-y-6 px-6 md:px-12 pt-6 pb-20">
      {/* Заголовок */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Каталог льгот</h1>
          <p className="text-gray-600">Интуитивный каталог с фильтрами, поиском и рекомендациями</p>
        </div>
        <div className="w-full md:w-80">
          <Input placeholder="Поиск по льготам..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      {/* Вкладки категорий — сдвинуты влево с небольшим отступом */}
      <div className="pl-2">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as BenefitCategoryKey)}>
          <TabsList className="flex flex-wrap gap-2">
            {CATEGORY_TABS.map(t => (
              <TabsTrigger key={t.key} value={t.key} className="capitalize">
                {t.title}
                <Badge variant="secondary" className="ml-2">
                  {categoryStats[t.key].count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Сводная статистика по активной категории */}
      <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Количество льгот</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{activeTab === 'all' ? BENEFITS.length : categoryStats[activeTab].count}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Партнёров</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{activeTab === 'all' ? categoryStats.all.partners : categoryStats[activeTab].partners}</CardContent>
        </Card>
      </div>

      {/* Список льгот — компактные карточки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="py-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {item.name}
                    {item.status === 'planned' && <Badge variant="outline">в разработке</Badge>}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {item.shortDescription}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">Партнёров</div>
                <div className="font-semibold">{formatNumber(item.stats.partners || 0)}</div>
              </div>
              <Button className="w-full mt-3" onClick={() => setSelected(item)} disabled={item.status === 'planned'}>
                Подробнее
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Детали льготы */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative">
            <button className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-700" onClick={() => setSelected(null)}>&times;</button>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-4xl flex-shrink-0">{selected.icon}</div>
              <div>
                <h2 className="text-2xl font-bold">{selected.name}</h2>
                <div className="text-gray-600">{selected.shortDescription}</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="font-semibold mb-1">Как пользоваться</div>
                {selected.howTo.length ? (
                  <ol className="list-decimal list-inside text-sm space-y-1">
                    {selected.howTo.map((s, i) => (<li key={i}>{s}</li>))}
                  </ol>
                ) : (
                  <div className="text-sm text-gray-500">Информация в разработке</div>
                )}
              </div>
              <div>
                <div className="font-semibold mb-1">Преимущества</div>
                {selected.advantages.length ? (
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {selected.advantages.map((s, i) => (<li key={i}>{s}</li>))}
                  </ul>
                ) : (
                  <div className="text-sm text-gray-500">—</div>
                )}
                <div className="font-semibold mt-4 mb-1">Ограничения</div>
                {selected.limitations.length ? (
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {selected.limitations.map((s, i) => (<li key={i}>{s}</li>))}
                  </ul>
                ) : (
                  <div className="text-sm text-gray-500">—</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-center">
              <div className="text-xs text-gray-500">{selected.partnerType === 'точек' ? 'Точек' : 'Партнёров'}</div>
                <div className="font-semibold">{formatNumber(selected.stats.partners || 0)}</div>
              {typeof selected.stats.limit === 'number' && (
                <div>
                  <div className="text-xs text-gray-500">Лимит</div>
                  <div className="font-semibold">{formatNumber(selected.stats.limit)}</div>
                </div>
              )}
              {typeof selected.stats.used === 'number' && (
                <div>
                  <div className="text-xs text-gray-500">Использовано</div>
                  <div className="font-semibold">{formatNumber(selected.stats.used)}</div>
                </div>
              )}
              {typeof selected.stats.available === 'number' && (
                <div>
                  <div className="text-xs text-gray-500">Доступно</div>
                  <div className="font-semibold">{formatNumber(selected.stats.available)}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}