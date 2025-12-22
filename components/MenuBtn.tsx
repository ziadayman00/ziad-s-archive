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
      className="group relative z-[50] cursor-pointer text-4xl md:text-5xl text-[#e8e6e0] transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {/* Animated background glow */}
      <div className={`absolute inset-0 rounded-full bg-[#e8e6e0] blur-xl transition-all duration-500 ${
        isOpen ? 'opacity-10 scale-150' : 'opacity-0 scale-100 group-hover:opacity-5 group-hover:scale-125'
      }`} />
      
      {/* Rotating border ring */}
      <div className={`absolute inset-0 rounded-full transition-all duration-700 ${
        isOpen ? 'opacity-100 rotate-180' : 'opacity-0 rotate-0 group-hover:opacity-30 group-hover:rotate-90'
      }`}>
        <div className="absolute inset-0 rounded-full border border-[#e8e6e0] opacity-20" 
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
          }}
        />
      </div>
      
      {/* Main icon container */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Menu icon */}
        <BiMenuAltRight
          className={`absolute transition-all duration-500 ease-out ${
            isOpen 
              ? 'opacity-0 rotate-180 scale-0 blur-sm' 
              : 'opacity-100 rotate-0 scale-100 blur-0 group-hover:rotate-12'
          }`}
        />
        
        {/* Close icon */}
        <IoClose
          className={`absolute transition-all duration-500 ease-out ${
            isOpen 
              ? 'opacity-100 rotate-0 scale-100 blur-0 group-hover:rotate-90' 
              : 'opacity-0 rotate-180 scale-0 blur-sm'
          }`}
        />
        
        {/* Animated dots indicator */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full bg-[#e8e6e0] transition-all duration-300 ${
                isOpen 
                  ? 'opacity-60 scale-100' 
                  : 'opacity-0 scale-0'
              }`}
              style={{
                transitionDelay: `${i * 50}ms`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Corner accent marks */}
      <div className={`absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#e8e6e0] transition-all duration-500 ${
        isOpen ? 'opacity-40 scale-100' : 'opacity-0 scale-50'
      }`} />
      <div className={`absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#e8e6e0] transition-all duration-500 ${
        isOpen ? 'opacity-40 scale-100' : 'opacity-0 scale-50'
      }`} />
    </button>
  );
};

export default MenuBtn;