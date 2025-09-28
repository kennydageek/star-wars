interface PropTypes {
  title: string;
  children: React.ReactNode;
}

const FormHeader = ({ title, children }: PropTypes) => {
  return (
    <div className="heading">
      <h3 className="text-[#434854] leading-[32px] font-semibold text-2xl mb-1">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default FormHeader;
