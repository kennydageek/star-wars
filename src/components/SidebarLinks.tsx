import React from 'react';
import { NavLink } from 'react-router-dom';

interface LinkItem {
  route: string;
  title: string;
  iconColor: string; // Remove isActive since we'll determine it dynamically
}

interface SidebarLinksProps {
  item: LinkItem;
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({ item }) => {
  const colorMap: Record<string, string> = {
    '#A9C1FF': 'bg-blue-300',
    '#FFA9EC': 'bg-pink-300',
    '#FDFFA9': 'bg-yellow-300',
  };

  const colorClass = colorMap[item.iconColor] || 'bg-gray-300';

  return (
    <NavLink
      to={item.route}
      className={({ isActive }) =>
        `flex text-white font-semibold gap-3 py-3 px-6 rounded transition-colors ${
          isActive ? 'bg-[#0A74DC]' : ''
        }`
      }
    >
      <div
        className={`w-[17px] self-center h-4 rounded-[5px] ${colorClass}`}
      ></div>
      <span className="self-center leading-[24px]">{item.title}</span>
    </NavLink>
  );
};

export default SidebarLinks;
