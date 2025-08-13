
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/LoginForm';
import { Layout } from '@/components/Layout';
import { EmployeeDashboard } from '@/components/employee/EmployeeDashboard';
import { BenefitCatalog } from '@/components/employee/BenefitCatalog';
import { BenefitHistory } from '@/components/employee/BenefitHistory';
import { UserProfile } from '@/components/employee/UserProfile';
import { UserSettings } from '@/components/employee/UserSettings';
import { HRDashboard } from '@/components/hr/HRDashboard';

const Index = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    return <LoginForm />;
  }

  const isEmployee = user.role === 'employee';

  const renderEmployeeContent = () => {
    switch (activeTab) {
      case 'catalog':
        return <BenefitCatalog />;
      case 'history':
        return <BenefitHistory />;
      case 'profile':
        return <UserProfile />;
      case 'settings':
        return <UserSettings />;
      default:
        return <EmployeeDashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {isEmployee ? renderEmployeeContent() : <HRDashboard />}
    </Layout>
  );
};

export default Index;
