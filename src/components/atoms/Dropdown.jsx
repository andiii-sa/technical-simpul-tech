import { useState } from "react";

const Dropdown = ({ lists = [], label, className, classNameContent }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <div className="h-full flex" onClick={() => setOpen(!open)}>
        {label}
      </div>
      {open && (
        <div
          className={`absolute z-10 flex flex-col border border-gray-3 rounded-[5px] overflow-hidden bg-white mt-2 ${classNameContent}`}
        >
          {lists?.map(({ label, className, onClick, ...props }, idx) => (
            <div
              key={idx}
              className={`whitespace-nowrap font-bold text-gray-2 cursor-pointer px-[15px] py-[13px] ${
                idx !== 0 ? "border-t border-t-gray-3" : ""
              } ${className}`}
              onClick={() => {
                onClick();
                setOpen(false);
              }}
              {...props}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
