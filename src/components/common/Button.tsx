interface ItemProp {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children }: ItemProp) => {
  return (
    <button className="bg-[#0A74DC] cursor-pointer rounded-md py-3 font-medium text-white">
      {children}
    </button>
  );
};

export default Button;
