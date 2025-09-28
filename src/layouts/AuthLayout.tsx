// AuthLayout.tsx
import { Outlet } from 'react-router-dom';
import logo from '@/assets/icons/logo.svg';

const AuthLayout = () => {
  return (
    <div className="flex">
      <div className="w-[480px] hidden lg:flex bg-[#031434] fixed h-screen justify-center items-center">
        <img src={logo} className="w-[385px]" alt="logo" />
      </div>

      <div className="flex justify-center lg:ml-[480px] items-center grow">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
