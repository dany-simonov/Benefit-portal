
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { EmployeeSidebar } from '@/components/employee/EmployeeSidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const EmployeeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:hidden p-4 border-b bg-white flex justify-between items-center">
        <h1 className="text-lg font-bold">Benefit Admin</h1>
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <EmployeeSidebar />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex">
        <div className="hidden md:block">
          <EmployeeSidebar />
        </div>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
