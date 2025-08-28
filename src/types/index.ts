export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'hr' | 'admin';
  department?: string;
  pointsBalance: number;
  avatar?: string;
  password?: string;
}

export interface BenefitCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  totalLimit: number;
  usedPoints: number;
  providers: BenefitProvider[];
  disabled?: boolean;
  partnerType?: string;
  partnerCount?: number;
}

export interface BenefitProvider {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  pointsRate: number; // points per ruble
  minPoints: number;
  maxPoints: number;
}

export interface UserBenefitAllocation {
  categoryId: string;
  allocatedPoints: number;
  usedPoints: number;
  lastUpdated: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  categoryId: string;
  providerId: string;
  points: number;
  amount: number;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}
