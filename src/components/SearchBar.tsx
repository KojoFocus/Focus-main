import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mt-12 px-6 pt-20">
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          value={query}
          onChange={handleInputChange}
          className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-white ring-1 ring-inset ring-[#f5d08c] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f5d08c] sm:text-sm sm:leading-6 bg-transparent"
          placeholder="Search for honey"
        />
      </div>
    </div>
  );
};

export default SearchBar;
