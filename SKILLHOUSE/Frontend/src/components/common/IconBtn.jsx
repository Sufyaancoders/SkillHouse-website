import React from "react";
export default function IconBtn({
    text,
    onclick,
    onClick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    // Handle both onclick and onClick props for compatibility
    const handleClick = onClick || onclick;
    
    return (
      <button
        disabled={disabled}
        onClick={handleClick}
        className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-black ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }