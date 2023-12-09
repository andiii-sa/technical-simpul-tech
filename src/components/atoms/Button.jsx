import React from "react";

const Button = ({ className = "", children, ...props }) => {
  return (
    <button
      className={`flex-none py-2 px-4 rounded-[5px] bg-blue-1 text-white font-bold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
