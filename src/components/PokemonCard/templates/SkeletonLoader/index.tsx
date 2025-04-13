import classNames from "classnames";

// Skeleton Loader Component
const SkeletonLoader = ({ tileMode }: { tileMode: "single" | "multi" }) => (
  <div
    className={classNames(
      "w-full",
      "relative",
      "cursor-pointer",
      "perspective-1000",
      tileMode === "single" ? "h-96" : "h-72"
    )}
  >
    <div
      className={classNames(
        "w-full",
        "h-full",
        "relative",
        "transition-all",
        "transform-style-preserve-3d"
      )}
    >
      {/* Front Skeleton */}
      <div
        className={classNames(
          "flex",
          "px-5",
          "pb-5",
          "w-full",
          "h-full",
          "gap-y-3",
          "flex-col",
          "absolute",
          "rounded-lg",
          "ease-in-out",
          "backface-hidden",
          "bg-cotton-ball",
          tileMode === "single" ? "pt-5" : "pt-10"
        )}
      >
        <div
          className={classNames(
            "flex",
            "flex-row",
            "items-center",
            "justify-between"
          )}
        >
          <div
            className={classNames("h-4", "w-16", "bg-gray-300", "rounded")}
          />
          <div
            className={classNames("h-4", "w-12", "bg-gray-300", "rounded")}
          />
        </div>
        {/* Skeleton Image */}
        <div
          className={classNames(
            "h-64",
            "px-10",
            "w-full",
            "rounded",
            "bg-gray-300",
            "animate-pulse"
          )}
        />
        <div
          className={classNames(
            "h-4",
            "w-24",
            "mt-2",
            "rounded",
            "mx-auto",
            "bg-gray-300"
          )}
        />
      </div>

      {/* Back Skeleton */}
      <div
        className={classNames(
          "flex",
          "px-5",
          "pb-5",
          "w-full",
          "h-full",
          "absolute",
          "flex-col",
          "rounded-lg",
          "rotate-y-180",
          "backface-hidden",
          "bg-cotton-ball",
          tileMode === "single"
            ? classNames("pt-5", "justify-center", "gap-y-5")
            : classNames("pt-10", "justify-between")
        )}
      >
        <div
          className={classNames(
            "h-4",
            "w-32",
            "mb-2",
            "rounded",
            "bg-gray-300"
          )}
        />
        <div
          className={classNames(
            "mb-5",
            "h-20",
            "w-full",
            "rounded",
            "bg-gray-300",
            "animate-pulse"
          )}
        />
        <div
          className={classNames(
            "h-8",
            "w-32",
            "rounded",
            "bg-gray-300",
            "animate-pulse"
          )}
        />
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
