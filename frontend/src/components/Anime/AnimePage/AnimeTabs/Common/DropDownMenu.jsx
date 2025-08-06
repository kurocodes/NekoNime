import "../../../../../styles/scrollbar.css";
import { useEffect, useRef, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";

export default function DropDownMenu({
  options = [],
  selected,
  setSelected,
  className = "",
  buttonClass = "",
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState("bottom");

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const toggleDropdown = () => {
    if (!showDropdown) calculateDropdownPosition();
    setShowDropdown((prev) => !prev);
  };

  // Calculate the position of the dropdown based on available space
  const calculateDropdownPosition = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    const dropdownHeight = 160;
    const spaceBelow = window.innerHeight - rect.bottom;
    setDropDownPosition(spaceBelow < dropdownHeight ? "top" : "bottom");
  };

  return (
    <div ref={buttonRef} className={`relative ${className}`}>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-2 text-xs sm:text-sm px-4 py-2 border-2 border-b-0 border-primary rounded-t-md text-primary cursor-pointer transition duration-300 hover:bg-primary hover:text-white ${buttonClass}`}
      >
        <span>{selected}</span>
        <IoIosArrowDown />
      </button>

      {/* Dropdown Content */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className={`absolute right-0 z-20 min-w-[110px] max-h-[300px] overflow-y-auto custom-scrollbar w-full bg-white border border-gray-300 rounded-md shadow-lg ${
            dropDownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setShowDropdown(false);
                setSelected(option);
              }}
              className="w-full text-left px-4 py-2 hover:bg-secondary/20 transition-colors text-sm cursor-pointer"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
