import { NavLink } from 'react-router-dom'; // Change to NavLink for the overview link too
import logo from '@/assets/icons/logo.svg';
import menu from '@/assets/icons/menu.svg';
import SidebarLinks from '../SidebarLinks';

const Sidebar = () => {
  const linkItems = [
    {
      route: '/starships',
      title: 'Starships',
      iconColor: '#A9C1FF',
    },
    {
      route: '/people',
      title: 'People',
      iconColor: '#FFA9EC',
    },
    {
      route: '/species',
      title: 'Species',
      iconColor: '#FDFFA9',
    },
  ];

  return (
    <div className="w-[272px] h-screen bg-[#031434] py-8 px-6 fixed">
      <img src={logo} className="w-[107px] mx-auto" alt="logo" />

      <div className="mt-7.5 flex flex-col gap-10">
        <NavLink
          to="/overview"
          className={({ isActive }) =>
            `flex gap-3 text-white font-semibold leading-[24px] py-3 rounded px-6 transition-colors ${
              isActive ? 'bg-[#0A74DC]' : 'bg-transparent '
            }`
          }
        >
          <img src={menu} alt="" />
          <span>Overview</span>
        </NavLink>

        <ul className="">
          {linkItems.map((item) => (
            <SidebarLinks item={item} key={item.route} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
