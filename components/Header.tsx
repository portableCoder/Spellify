import React from "react";
import { RxLetterCaseCapitalize } from "react-icons/rx";
type HeaderProps = {
  total?: number;
  index?: number;
  showCounter?: boolean;
};
const Header = ({ total, index, showCounter }: HeaderProps) => {
  return (
    <>
      <div className="w-full font-inter font-bold flex justify-between  gap-x-2 py-2 items-center  text-transparent text-4xl md:text-6xl bg-clip-text bg-gradient-to-bl  from-purple-500 to-orange-500">
        <div className="flex gap-x-2 items-center justify-center">
          <div className="text-white text-2xl md:text-3xl">
            {" "}
            <RxLetterCaseCapitalize />
          </div>
          <div> SPELLiFY </div>
        </div>

        {showCounter && index !== undefined && total !== undefined && (
          <div className="w-8 h-8 z-20 md:w-12 md:h-12 text-xs md:text-lg text-center text-white md:text-md font-bold  right-0 top-0 relative flex items-center justify-center">
            <div className="z-20 bg-zinc-900 w-full h-full rounded-full flex items-center justify-center">
              {index + 1}/{total}{" "}
            </div>
            <div className="absolute transform scale-110 top-0 left-0 rounded-full w-full h-full bg-gradient-to-r from-orange-500 to-purple-500"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
