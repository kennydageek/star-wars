interface ItemProp {
  children: React.ReactNode;
  disabled: boolean;
  className?: string;
}

const Button = ({ disabled, children }: ItemProp) => {
  return (
    <button
      className="bg-[#0A74DC] cursor-pointer rounded-md py-3 font-medium text-white"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
