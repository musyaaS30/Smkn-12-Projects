const SortBy = ({ onSort }: { onSort: (sortType: string) => void }) => {
  return (
    <div className="relative w-full">
      {/* Custom Chevron */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {/* Select with appearance-none to hide the default chevron */}
      <select
        onChange={(e) => onSort(e.target.value)}
        className="text-sm p-2 mr-2 bg-chronicle text-white rounded-xl w-full pr-8 pl-4 appearance-none" // Added appearance-none to hide the default arrow
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
