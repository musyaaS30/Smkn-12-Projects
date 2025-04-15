// Deps
import classNames from "classnames";

const SortBy = ({ onSort }: { onSort: (sortType: string) => void }) => {
  return (
    <div className={classNames("relative", "w-full")}>
      {/* Custom Chevron */}
      <div
        className={classNames(
          "flex",
          "pr-3",
          "right-0",
          "absolute",
          "inset-y-0",
          "items-center",
          "pointer-events-none"
        )}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={classNames("w-4", "h-4", "text-white")}
        >
          <path
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <select
        onChange={(e) => onSort(e.target.value)}
        className={classNames(
          "p-2",
          "mr-2",
          "pr-8",
          "pl-4",
          "w-full",
          "text-sm",
          "rounded-xl",
          "text-white",
          "bg-chronicle",
          "appearance-none"
        )}
      >
        <option value="id-asc">Sort by ID Ascending</option>
        <option value="id-desc">Sort by ID Descending</option>
        <option value="name-asc">Sort by Name Ascending</option>
        <option value="name-desc">Sort by Name Descending</option>
      </select>
    </div>
  );
};

export default SortBy;
