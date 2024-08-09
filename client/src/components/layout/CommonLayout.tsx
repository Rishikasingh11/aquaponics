import { Outlet } from 'react-router-dom';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';

const AdminDashboardLayout: React.FC = () => {
  return (
    <>
    <Header/>
      <Outlet />
    <Footer/>
    </>
  );
};

export default AdminDashboardLayout;
