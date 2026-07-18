const CardWrp = ({ children, className = "" }) => {
  return (
    <div
      className={`glass-card rounded-2xl p-4 animate-fade-in-up ${className}`}
    >
      {children}
    </div>
  );
};

export default CardWrp;
