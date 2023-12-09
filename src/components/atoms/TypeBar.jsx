import React from "react";

const TypeBar = ({ className, ...props }) => {
  return (
    <input
      type="text"
      placeholder="Type a new message"
      className={`focus:outline-none flex-1 placeholder:text-gray-3 text-gray-3 border border-gray-3 rounded-[5px] px-4 py-[10px] ${className}`}
      {...props}
    />
  );
};

export default TypeBar;
