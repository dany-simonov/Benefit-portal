import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/types';

interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User['role']>;
  logout: () => void;
  isLoading: boolean;
  register: (input: RegisterInput) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const demoUsers: User[] = [
  {
    id: '1',
    email: 'employee@company.com',
    name: 'Анна Сотрудникова',
    role: 'employee',
    department: 'Разработка',
    pointsBalance: 25000,
    avatar: '/placeholder.svg',
    password: 'password',
  },
  {
    id: '2',
    email: 'hr@company.com',
    name: 'Мария HR-менеджер',
    role: 'hr',
    department: 'HR',
    pointsBalance: 0,
    avatar: '/placeholder.svg',
    password: 'password',
  }
];

function getUsersFromStorage(): User[] {
  const data = localStorage.getItem('users');
  if (data) return JSON.parse(data);
  return demoUsers;
}

function saveUsersToStorage(users: User[]) {
  localStorage.setItem('users', JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const demoUser = localStorage.getItem('demo-user');
    if (demoUser) {
      setUser(JSON.parse(demoUser));
    }
    const onStorage = () => {
      const demoUser = localStorage.getItem('demo-user');
      if (demoUser) {
        setUser(JSON.parse(demoUser));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = async (email: string, password: string): Promise<User['role']> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = [...getUsersFromStorage(), ...demoUsers.filter(d => !getUsersFromStorage().some(u => u.email === d.email))];
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      setIsLoading(false);
      localStorage.removeItem('demo-user');
      return foundUser.role;
    } else {
      setIsLoading(false);
      throw new Error('Неверные учетные данные');
    }
  };

  const register = async (input: RegisterInput) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = getUsersFromStorage();
    if (users.find(u => u.email === input.email)) {
      setIsLoading(false);
      throw new Error('Пользователь с таким email уже существует');
    }
    const newUser: User = {
      id: Date.now().toString(),
      email: input.email,
      name: `${input.firstName} ${input.lastName}`,
      role: 'employee',
      department: 'Не указано',
      pointsBalance: 10000,
      avatar: '/placeholder.svg',
      password: input.password,
    };
    const updatedUsers = [...users, newUser];
    saveUsersToStorage(updatedUsers);
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('demo-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
