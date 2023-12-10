import { IconSearch } from "assets/icons";
import React from "react";

const SearchBar = ({ value, handleChange }) => {
  return (
    <div className="w-full flex gap-1 items-center justify-between border border-gray-3 rounded-[5px] p-[10px]">
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => handleChange(e?.target?.value)}
        className="focus:outline-none placeholder:text-gray-1 text-gray-1 h-3 w-full"
      />
      <IconSearch color="fill-gray-3" className="w-3 h-w-3 flex-none" />
    </div>
  );
};

export default SearchBar;
