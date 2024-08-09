import { Outlet } from 'react-router-dom';
import DashboardLayout from '../dashboard/DashboardLayout';
import AdminSidebarNav from '@/pages/admin/components/AdminSidebarNav';

const UserDashboardLayout: React.FC = () => {
  return (
    <DashboardLayout title="User Dashboard" MenuComponent={<AdminSidebarNav />}>
      <Outlet />
    </DashboardLayout>
  );
};

export default UserDashboardLayout;
