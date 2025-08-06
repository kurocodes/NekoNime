import React from "react";

export default function FilterButton({
  label,
  icon,
  bgColor,
  textColor,
  onClick,
}) {
  const defaultStyles = {
    backgroundColor: bgColor,
    color: textColor,
  };
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md cursor-pointer transition hover:scale-105 hover:shadow-xl`}
      style={defaultStyles}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#fff";
        e.currentTarget.style.color = bgColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = bgColor;
        e.currentTarget.style.color = textColor;
      }}
      onClick={onClick}
    >
      <span className="text-md">{icon && React.createElement(icon)}</span>
      {label}
    </button>
  );
}
