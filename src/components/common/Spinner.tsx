const Spinner = ({ loadingText }: { loadingText: string }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
      <span>{loadingText}</span>
    </div>
  );
};

export default Spinner;
