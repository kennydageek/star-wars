import Bell from '@/assets/icons/bell.svg';
import Account from '@/assets/icons/account.svg';
import ThreeDots from '@/assets/icons/three-dots.svg';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';

const TopNav = () => {
  const { id } = useParams();

  return (
    <div
      className={`py-5 shadow shadow-[#E5E5E54D] px-10 flex ${
        id ? 'justify-between' : 'justify-end'
      }`}
    >
      <BackButton />
      <div className="flex gap-7">
        <img src={Bell} alt="" />

        <div className="flex gap-20 self-center border-l border-[#E5E5E5] pl-10">
          <div className="flex gap-5">
            <img src={Account} alt="" />
            <p className="self-center text-[15px] text-[#303B54]">John Doe</p>
          </div>
          <img src={ThreeDots} alt="" className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
