import { Outlet } from 'react-router-dom';
import DashboardLayout from '../dashboard/DashboardLayout';
import AdminSidebarNav from '@/pages/admin/components/AdminSidebarNav';

const AdminDashboardLayout: React.FC = () => {
  return (
    <DashboardLayout title="Admin Dashboard" MenuComponent={<AdminSidebarNav />}>
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminDashboardLayout;
