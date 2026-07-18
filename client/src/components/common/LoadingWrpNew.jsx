const LoadingWrpNew = ({ text, ...props }) => {
  return (
    <div
      className="flex items-center justify-center gap-2 w-full m-5"
      {...props}
    >
      <div className="animate-spin rounded-full h-[50px] w-[50px] border-b-2 border-white"></div>
      <span>{text}</span>
    </div>
  );
};

export default LoadingWrpNew;
