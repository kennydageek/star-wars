import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackIconDefault from '@/assets/icons/chevron_right.svg';

interface BackButtonProps {
  showCondition?: boolean;
  className?: string;
  iconClassName?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  showCondition = true,
  className = 'flex gap-2 cursor-pointer',
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  if (!showCondition) {
    return null;
  }

  return (
    <button
      onClick={handleBack}
      className={`flex bg-transparent border-none p-0 ${className}`}
      type="button"
    >
      <img src={BackIconDefault} className="w-[9px] self-center" />

      <span className="text-[#A4A7B7] self-center">Back</span>
    </button>
  );
};

export default BackButton;
