import { BenefitCategory, Transaction, UserBenefitAllocation } from '@/types';

export const benefitCategories: BenefitCategory[] = [
  {
    id: 'dms',
    name: 'ДМС',
    icon: '🏥',
    description: 'Добровольное медицинское страхование',
    color: 'bg-gradient-to-br from-red-500 to-red-600',
    totalLimit: 40000,
    usedPoints: 0,
    providers: [{ id: 'sogaz', name: 'СОГАЗ-Мед', category: 'dms', description: 'Полис ДМС с широкой сетью клиник', logo: '/placeholder.svg', pointsRate: 1, minPoints: 5000, maxPoints: 40000 }],
    partnerType: 'партнеров'
  },
  {
    id: 'fitness-coach',
    name: 'Консультация с фитнес-тренером',
    icon: '🏋️',
    description: 'Персональные тренировки для здоровья и прогресса.',
    color: 'bg-gradient-to-br from-lime-500 to-lime-600',
    totalLimit: 15000,
    usedPoints: 0,
    providers: [],
    partnerType: 'партнеров',
    partnerCount: 1
  },
  {
    id: 'healthy-lifestyle',
    name: 'Консультация по ЗОЖ',
    icon: '🥗',
    description: 'Рекомендации по питанию, активности и профилактике.',
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    totalLimit: 15000,
    usedPoints: 0,
    providers: [],
    partnerType: 'партнеров',
    partnerCount: 1
  },
  {
    id: 'mindfulness-coach',
    name: 'Консультация по практикам осознанности',
    icon: '🧘',
    description: 'Навыки концентрации и стрессоустойчивости.',
    color: 'bg-gradient-to-br from-teal-500 to-teal-600',
    totalLimit: 15000,
    usedPoints: 0,
    providers: [],
    partnerType: 'партнеров',
    partnerCount: 1
  },
  {
    id: 'sex-expert',
    name: 'Консультация по сексуальным отношениям',
    icon: '❤️',
    description: 'Поддержка и советы по вопросам интимной жизни.',
    color: 'bg-gradient-to-br from-rose-500 to-rose-600',
    totalLimit: 15000,
    usedPoints: 0,
    providers: [],
    partnerType: 'партнеров',
    partnerCount: 1
  },
  {
    id: 'icf-coach',
    name: 'Сессия с коучем (ICF)',
    icon: '🎯',
    description: 'Помощь в достижении целей и развитию навыков.',
    color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    totalLimit: 15000,
    usedPoints: 0,
    providers: [],
    partnerType: 'партнеров',
    partnerCount: 1
  },
  {
    id: 'pet-care',
    name: 'Консультация по уходу за питомцем',
    icon: '🐾',
    description: 'Советы по воспитанию и заботе о животном.',
    color: 'bg-gradient-to-br from-amber-500 to-amber-600',
    totalLimit: 15000,
    usedPoints: 0,
    providers: [],
    partnerType: 'партнеров',
    partnerCount: 1
  },
  {
    id: 'lawyer',
    name: 'Консультация юриста',
    icon: '⚖️',
    description: 'Юридическая помощь в личных вопросах.',
    color: 'bg-gradient-to-br from-stone-500 to-stone-600',
    totalLimit: 15000,
    usedPoints: 0,
    providers: [],
    partnerType: 'партнеров',
    partnerCount: 1
  },
  {
    id: 'finance-expert',
    name: 'Консультация по личным финансам',
    icon: '💰',
    description: 'Поддержка и советы по управлению финансами.',
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    totalLimit: 15000,
    usedPoints: 0,
    providers: [],
    partnerType: 'партнеров',
    partnerCount: 1
  },
  {
    id: 'yandex-go',
    name: 'Яндекс Go (еда, продукты и товары)',
    icon: '🛒',
    description: 'Доставка еды, продуктов и товаров',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    totalLimit: 20000,
    usedPoints: 0,
    providers: [
        { id: 'yandex-go-provider-1', name: 'Яндекс Go', category: 'yandex-go', description: 'Доставка еды, продуктов и товаров', logo: '/placeholder.svg', pointsRate: 1, minPoints: 500, maxPoints: 20000 },
        { id: 'yandex-go-provider-2', name: 'Яндекс Go', category: 'yandex-go', description: 'Доставка еды, продуктов и товаров', logo: '/placeholder.svg', pointsRate: 1, minPoints: 500, maxPoints: 20000 }
    ],
    partnerType: 'партнеров'
  },
  {
    id: 'smartway',
    name: 'Smartway (билеты, отели, ЖД)',
    icon: '✈️',
    description: 'Бронирование билетов и отелей',
    color: 'bg-gradient-to-br from-sky-500 to-sky-600',
    totalLimit: 40000,
    usedPoints: 0,
    providers: [
        { id: 'smartway-provider-1', name: 'Smartway', category: 'smartway', description: 'Бронирование билетов и отелей', logo: '/placeholder.svg', pointsRate: 1, minPoints: 1000, maxPoints: 40000 },
        { id: 'smartway-provider-2', name: 'Smartway', category: 'smartway', description: 'Бронирование билетов и отелей', logo: '/placeholder.svg', pointsRate: 1, minPoints: 1000, maxPoints: 40000 },
        { id: 'smartway-provider-3', name: 'Smartway', category: 'smartway', description: 'Бронирование билетов и отелей', logo: '/placeholder.svg', pointsRate: 1, minPoints: 1000, maxPoints: 40000 }
    ],
    partnerType: 'партнеров'
  },
  {
    id: 'carsharing',
    name: 'Каршеринг',
    icon: '🚗',
    description: 'Аренда автомобилей',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    totalLimit: 20000,
    usedPoints: 0,
    providers: [
        { id: 'belkacar', name: 'BelkaCar', category: 'carsharing', description: 'Каршеринг', logo: '/placeholder.svg', pointsRate: 1, minPoints: 200, maxPoints: 5000 },
        { id: 'yandex-drive', name: 'Яндекс.Драйв', category: 'carsharing', description: 'Каршеринг', logo: '/placeholder.svg', pointsRate: 1, minPoints: 200, maxPoints: 5000 }
    ],
    partnerType: 'партнеров'
  },
  {
    id: 'taxi',
    name: 'Такси',
    icon: '🚕',
    description: 'Поездки на такси',
    color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    totalLimit: 15000,
    usedPoints: 0,
    providers: [
        { id: 'yandex-go-taxi', name: 'Яндекс Go', category: 'taxi', description: 'Такси', logo: '/placeholder.svg', pointsRate: 1, minPoints: 100, maxPoints: 3000 },
        { id: 'bibi', name: 'BiBi', category: 'taxi', description: 'Такси', logo: '/placeholder.svg', pointsRate: 1, minPoints: 100, maxPoints: 3000 },
        { id: 'swiftdrive', name: 'SwiftDrive', category: 'taxi', description: 'Такси', logo: '/placeholder.svg', pointsRate: 1, minPoints: 100, maxPoints: 3000 }
    ],
    partnerType: 'партнеров'
  },
  {
    id: 'fuel-cards',
    name: 'Топливные карты',
    icon: '⛽',
    description: 'Заправка топливом на АЗС',
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    totalLimit: 30000,
    usedPoints: 0,
    providers: [],
    partnerType: 'точек',
    partnerCount: 18500
  },
  {
    id: 'gas-station-goods',
    name: 'Товары на АЗС',
    icon: '🛢️',
    description: 'Автомасла, автохимия, незамерзайка',
    color: 'bg-gradient-to-br from-gray-500 to-gray-600',
    totalLimit: 12000,
    usedPoints: 0,
    providers: [],
    partnerType: 'точек',
    partnerCount: 18000
  },
  {
    id: 'car-wash',
    name: 'Мойки',
    icon: '🚿',
    description: 'Автомойка',
    color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    totalLimit: 6000,
    usedPoints: 0,
    providers: [],
    partnerType: 'точек',
    partnerCount: 1200
  },
  {
    id: 'tire-service',
    name: 'Шиномонтаж',
    icon: '🔧',
    description: 'Услуги шиномонтажа',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    totalLimit: 8000,
    usedPoints: 0,
    providers: [],
    partnerType: 'точек',
    partnerCount: 700
  },
  {
    id: 'languages',
    name: 'Языки (в разработке)',
    icon: '📚',
    description: 'Изучение иностранных языков',
    color: 'bg-gradient-to-br from-gray-400 to-gray-500',
    totalLimit: 0,
    usedPoints: 0,
    providers: [],
    disabled: true,
    partnerType: 'партнеров'
  }
];

export const userAllocations: UserBenefitAllocation[] = [
  {
    categoryId: 'fuel-cards',
    allocatedPoints: 15000,
    usedPoints: 8000,
    lastUpdated: new Date()
  },
  {
    categoryId: 'yandex-go',
    allocatedPoints: 12000,
    usedPoints: 9000,
    lastUpdated: new Date()
  },
  {
    categoryId: 'taxi',
    allocatedPoints: 8000,
    usedPoints: 5500,
    lastUpdated: new Date()
  },
  {
    categoryId: 'dms',
    allocatedPoints: 15000,
    usedPoints: 5000,
    lastUpdated: new Date()
  }
];

export const recentTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    categoryId: 'dms',
    providerId: 'sogaz',
    description: 'Оплата ДМС',
    date: new Date('2024-06-01'),
    points: 5000,
    amount: 5000,
    status: 'completed',
  },
  {
    id: '3',
    userId: '1',
    categoryId: 'carsharing',
    providerId: 'yandex-drive',
    description: 'Аренда авто Яндекс.Драйв',
    date: new Date('2024-05-25'),
    points: 1200,
    amount: 1500,
    status: 'completed',
  },
  {
    id: '4',
    userId: '1',
    categoryId: 'taxi',
    providerId: 'yandex-taxi',
    description: 'Поездка на такси',
    date: new Date('2024-05-22'),
    points: 800,
    amount: 900,
    status: 'completed',
  },
  {
    id: '7',
    userId: '1',
    categoryId: 'gas-station-goods',
    providerId: 'lukoil-shop',
    description: 'Покупка автохимии',
    date: new Date('2024-05-12'),
    points: 600,
    amount: 700,
    status: 'completed',
  },
  {
    id: '8',
    userId: '1',
    categoryId: 'tire-service',
    providerId: 'tire-master',
    description: 'Шиномонтаж',
    date: new Date('2024-05-10'),
    points: 1000,
    amount: 1200,
    status: 'completed',
  },
  {
    id: '9',
    userId: '1',
    categoryId: 'car-wash',
    providerId: 'clean-car',
    description: 'Мойка авто',
    date: new Date('2024-05-07'),
    points: 400,
    amount: 500,
    status: 'completed',
  },
  {
    id: '10',
    userId: '1',
    categoryId: 'fuel-cards',
    providerId: 'lukoil-shop',
    description: 'Заправка топливом',
    date: new Date('2024-05-04'),
    points: 1500,
    amount: 1800,
    status: 'completed',
  },
  {
    id: '22',
    userId: '1',
    categoryId: 'taxi',
    providerId: 'yandex-taxi',
    description: 'Поездка на такси (отклонено)',
    date: new Date('2024-05-30'),
    points: 700,
    amount: 800,
    status: 'failed',
  },
  {
    id: '23',
    userId: '1',
    categoryId: 'carsharing',
    providerId: 'yandex-drive',
    description: 'Аренда авто (ожидание)',
    date: new Date('2024-05-29'),
    points: 1000,
    amount: 1200,
    status: 'pending',
  },
  {
    id: '24',
    userId: '1',
    categoryId: 'dms',
    providerId: 'sogaz',
    description: 'Оплата ДМС (отклонено)',
    date: new Date('2024-05-27'),
    points: 5000,
    amount: 5000,
    status: 'failed',
  },
  {
    id: '26',
    userId: '1',
    categoryId: 'fuel-cards',
    providerId: 'lukoil-shop',
    description: 'Заправка топливом (отклонено)',
    date: new Date('2024-05-24'),
    points: 1200,
    amount: 1500,
    status: 'failed',
  },
  {
    id: '28',
    userId: '1',
    categoryId: 'car-wash',
    providerId: 'clean-car',
    description: 'Мойка авто (отклонено)',
    date: new Date('2024-05-19'),
    points: 400,
    amount: 500,
    status: 'failed',
  },
  {
    id: '29',
    userId: '1',
    categoryId: 'gas-station-goods',
    providerId: 'lukoil-shop',
    description: 'Покупка автохимии (ожидание)',
    date: new Date('2024-05-16'),
    points: 600,
    amount: 700,
    status: 'pending',
  },
  {
    id: '30',
    userId: '1',
    categoryId: 'tire-service',
    providerId: 'tire-master',
    description: 'Шиномонтаж (отклонено)',
    date: new Date('2024-05-13'),
    points: 1000,
    amount: 1200,
    status: 'failed',
  },
];

// Мок-данные для истории покупок
export interface PurchaseHistory {
  id: string;
  categoryId: string;
  benefitName: string;
  amount: number;
  points: number;
  date: Date;
  frequency: number;
  lastPurchase: Date;
  satisfaction: number;
  department: string;
}

export const mockPurchaseHistory: PurchaseHistory[] = [
  {
    id: '1',
    categoryId: 'taxi',
    benefitName: 'Такси',
    amount: 2500,
    points: 2500,
    date: new Date('2024-12-15'),
    frequency: 12,
    lastPurchase: new Date('2024-12-15'),
    satisfaction: 4,
    department: 'Разработка'
  },
  {
    id: '2',
    categoryId: 'yandex-go',
    benefitName: 'Обеды в офисе',
    amount: 1800,
    points: 1800,
    date: new Date('2024-12-14'),
    frequency: 45,
    lastPurchase: new Date('2024-12-14'),
    satisfaction: 5,
    department: 'Разработка'
  },
  {
    id: '3',
    categoryId: 'fuel-cards',
    benefitName: 'Топливо',
    amount: 5000,
    points: 5000,
    date: new Date('2024-12-10'),
    frequency: 8,
    lastPurchase: new Date('2024-12-10'),
    satisfaction: 4,
    department: 'Разработка'
  },
  {
    id: '4',
    categoryId: 'dms',
    benefitName: 'Массаж',
    amount: 3000,
    points: 3000,
    date: new Date('2024-11-20'),
    frequency: 2,
    lastPurchase: new Date('2024-11-20'),
    satisfaction: 5,
    department: 'Разработка'
  },
  {
    id: '5',
    categoryId: 'languages',
    benefitName: 'Онлайн курсы',
    amount: 15000,
    points: 15000,
    date: new Date('2024-10-15'),
    frequency: 1,
    lastPurchase: new Date('2024-10-15'),
    satisfaction: 3,
    department: 'Разработка'
  }
];

// Структура рекомендаций
export interface Recommendation {
  id: string;
  type: 'frequent' | 'similar' | 'department' | 'new' | 'seasonal' | 'budget';
  categoryId: string;
  title: string;
  description: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  actionType: 'suggest' | 'warn' | 'optimize';
  data: {
    expectedSavings?: number;
    usageTrend?: number;
    similarUsers?: number;
    deadline?: Date;
    reason: string;
  };
  price: number;
  points: number;
}

// Мок-данные для рекомендаций
export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    type: 'frequent',
    categoryId: 'taxi',
    title: 'Такси - ваша любимая льгота',
    description: 'Вы часто используете такси. Попробуйте премиум-тариф для большего комфорта.',
    confidence: 95,
    priority: 'high',
    actionType: 'suggest',
    data: {
      usageTrend: 12,
      reason: 'Покупали 12 раз за последние 3 месяца'
    },
    price: 3000,
    points: 3000
  },
  {
    id: '2',
    type: 'department',
    categoryId: 'yandex-go',
    title: 'Популярно в вашем отделе',
    description: '85% ваших коллег используют доставку обедов. Присоединяйтесь!',
    confidence: 87,
    priority: 'medium',
    actionType: 'suggest',
    data: {
      similarUsers: 85,
      reason: '85% коллег из отдела Разработка используют эту льготу'
    },
    price: 2000,
    points: 2000
  },
  {
    id: '3',
    type: 'new',
    categoryId: 'smartway',
    title: 'Новое предложение - кинотеатр',
    description: 'Вы еще не пробовали льготы развлечений. Специальное предложение!',
    confidence: 78,
    priority: 'medium',
    actionType: 'suggest',
    data: {
      reason: 'Вы не использовали льготы категории "Развлечения"'
    },
    price: 1500,
    points: 1500
  },
  {
    id: '4',
    type: 'seasonal',
    categoryId: 'dms',
    title: 'Зимняя забота о здоровье',
    description: 'В холодное время года особенно важно укреплять иммунитет.',
    confidence: 82,
    priority: 'medium',
    actionType: 'suggest',
    data: {
      reason: 'Сезонная рекомендация для укрепления здоровья'
    },
    price: 4000,
    points: 4000
  },
  {
    id: '5',
    type: 'budget',
    categoryId: 'languages',
    title: 'Экономьте баллы на обучении',
    description: 'У вас осталось много баллов. Инвестируйте в свое развитие!',
    confidence: 91,
    priority: 'high',
    actionType: 'optimize',
    data: {
      expectedSavings: 2000,
      reason: 'Эффективное использование оставшихся баллов'
    },
    price: 8000,
    points: 8000
  }
];