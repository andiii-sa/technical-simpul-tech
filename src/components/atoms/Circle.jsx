import React from "react";

const Circle = ({ children, className, ...props }) => {
  return (
    <div
      className={`w-[68px] h-[68px] rounded-full flex justify-center items-center cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Circle;
