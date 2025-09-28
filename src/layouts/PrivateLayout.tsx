// AuthLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';

const PrivateLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col   ml-[272px] grow">
        <TopNav />
        <div className="px-10 py-[44px] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
