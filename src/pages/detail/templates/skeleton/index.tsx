import classNames from "classnames";

const Skeleton = () => {
  return (
    <div className={classNames("animate-pulse")}>
      <div
        className={classNames(
          "h-64",
          "mb-6",
          "w-full",
          "rounded-xl",
          "bg-cotton-ball/10"
        )}
      />
      <div
        className={classNames(
          "h-5",
          "mb-3",
          "w-1/2",
          "rounded",
          "bg-cotton-ball/10"
        )}
      />
      <div
        className={classNames(
          "h-5",
          "mb-3",
          "w-1/4",
          "rounded",
          "bg-cotton-ball/10"
        )}
      />
      <div
        className={classNames("h-5", "bg-cotton-ball/10", "rounded", "w-1/3")}
      />
    </div>
  );
};

export default Skeleton;
