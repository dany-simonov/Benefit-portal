
import { Outlet } from 'react-router-dom';
import { EmployeeSidebar } from '@/components/employee/EmployeeSidebar';

const EmployeeLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <EmployeeSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;
