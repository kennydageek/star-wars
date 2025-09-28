import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Bell from '@/assets/icons/bell.svg';
import Account from '@/assets/icons/account.svg';
import ThreeDots from '@/assets/icons/three-dots.svg';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';

const TopNav = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    navigate('/');

    // Close dropdown
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`py-5 shadow shadow-[#E5E5E54D] px-10 flex ${
        id ? 'justify-between' : 'justify-end'
      } relative`}
    >
      <BackButton showCondition={id ? true : false} />
      <div className="flex gap-7">
        <img src={Bell} alt="Notifications" />

        <div className="flex gap-20 self-center border-l border-[#E5E5E5] pl-10">
          <div className="flex gap-5">
            <img src={Account} alt="User account" />
            <p className="self-center text-[15px] text-[#303B54]">John Doe</p>
          </div>

          {/* Three dots with dropdown */}
          <div className="relative self-center" ref={dropdownRef}>
            <img
              src={ThreeDots}
              alt="More options"
              className="cursor-pointer"
              onClick={toggleDropdown}
            />

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-5 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={handleLogout}
                  className="cursor-pointer block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 text-lg transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
