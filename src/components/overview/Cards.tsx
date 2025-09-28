interface CardItem {
  title: string;
  iconColor: string;
}

interface CardsProps {
  item: CardItem;
}

const Cards: React.FC<CardsProps> = ({ item }) => {
  const colorMap: Record<string, string> = {
    '#A9C1FF': 'bg-blue-300',
    '#FFA9EC': 'bg-pink-300',
    '#FDFFA9': 'bg-yellow-300',
  };
  const colorClass = colorMap[item.iconColor] || 'bg-gray-300';
  return (
    <div className="rounded-[10px] p-6 lg:basis-[208px] shadow-md shadow-[#00000040]">
      <div className="flex justify-between">
        <p className="text-[#434854] font-bold">{item.title}</p>
        <div className={`w-[27px] h-[26px] ${colorClass} rounded-[5px]`}></div>
      </div>

      <div className="mt-6">
        <p className="text-[#434854] font-bold">200</p>
        <p className="text-[#00992B] text-[9px] leading-6">
          20 More than than yesterday
        </p>
      </div>
    </div>
  );
};

export default Cards;
