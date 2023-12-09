import { IconSearch } from "assets/icons";
import React from "react";

const SearchBar = () => {
  return (
    <div className="w-full flex gap-1 items-center justify-between border border-gray-3 rounded-[5px] p-[10px]">
      <input
        type="text"
        placeholder="Search"
        className="focus:outline-none placeholder:text-gray-1 text-gray-1 h-3"
      />
      <IconSearch color="fill-gray-3" className="w-3 h-w-3" />
    </div>
  );
};

export default SearchBar;
