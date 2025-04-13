const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-64 bg-cotton-ball/10 rounded-xl mb-6" />
      <div className="h-5 bg-cotton-ball/10 rounded w-1/2 mb-3" />
      <div className="h-5 bg-cotton-ball/10 rounded w-1/4 mb-3" />
      <div className="h-5 bg-cotton-ball/10 rounded w-1/3" />
    </div>
  );
};

export default Skeleton;
