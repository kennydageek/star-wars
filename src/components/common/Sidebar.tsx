import { useState, useEffect } from 'react';
import logo from '@/assets/icons/logo.svg';
import menu from '@/assets/icons/menu.svg';
import close from '@/assets/icons/close.svg'; // You'll need a close icon
import SidebarLinks from '../SidebarLinks';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Close sidebar when clicking on a link on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.getElementById('menu-button');

      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          id="menu-button"
          onClick={toggleSidebar}
          className={`lg:hidden fixed top-4 ${
            isOpen ? 'right-4' : 'left-4 bg-[#031434]'
          } z-50 p-2  rounded-md shadow-lg`}
        >
          <img src={isOpen ? close : menu} alt="Menu" className="w-6 h-6" />
        </button>
      )}

      {/* Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity- z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`
          fixed lg:fixed
          w-[272px] h-full bg-[#031434] py-8 px-6
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <img src={logo} className="w-[107px] mx-auto" alt="logo" />

        <div className="mt-7.5 flex flex-col gap-10">
          <SidebarLinks
            item={{ route: '/overview', title: 'Overview', iconColor: '' }}
            key="/overview"
            onClick={handleLinkClick}
          />

          <ul className="">
            {linkItems.map((item) => (
              <SidebarLinks
                item={item}
                key={item.route}
                onClick={handleLinkClick}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
