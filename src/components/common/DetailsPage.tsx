interface itemProps {
  image: string | undefined;
  title: string | undefined;
  children: React.ReactNode;
}

const DetailsPage: React.FC<itemProps> = ({ image, title, children }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
      <div className="lg:w-[318px] h-[450px]">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-10 mt-12">
        <h3 className="text-5xl font-bold text-black ">{title}</h3>

        {children}
      </div>
    </div>
  );
};

export default DetailsPage;
