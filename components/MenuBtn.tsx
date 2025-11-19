'use client'
import React from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

interface MenuBtnProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuBtn = ({ isOpen, onClick }: MenuBtnProps) => {
  return (
    <button 
      onClick={onClick}
      className="relative z-50 cursor-pointer text-4xl md:text-5xl text-[#fafbd7] transition-all duration-300 hover:scale-110 active:scale-95 "
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        <BiMenuAltRight
          className={`absolute transition-all duration-300 ${
            isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <IoClose
          className={`absolute transition-all duration-300 ${
            isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
    </button>
  );
};

export default MenuBtn;
