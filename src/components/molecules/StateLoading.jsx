import { IconLoading } from "assets/icons";
import React from "react";

const StateLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <IconLoading />
      <span className="text-gray-2 font-bold text-center">
        Loading Chats ...
      </span>
    </div>
  );
};

export default StateLoading;
