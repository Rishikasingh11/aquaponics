import { Outlet } from 'react-router-dom';
import DashboardLayout from '../dashboard/DashboardLayout';
import AdminSidebarNav from '@/pages/admin/components/AdminSidebarNav';

const ManagerDashboardLayout: React.FC = () => {
  return (
    <DashboardLayout title="Manager Dashboard" MenuComponent={<AdminSidebarNav />}>
      <Outlet />
    </DashboardLayout>
  );
};

export default ManagerDashboardLayout;
