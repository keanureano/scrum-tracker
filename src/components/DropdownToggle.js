"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function DropdownToggle({ label, children }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={ref}>
      <button onClick={toggleDropdown}>
        {label}
        <Image src="/caret.svg" width={12} height={12} alt="caret" />
      </button>
      {isOpen && <div className="dropdown">{children}</div>}
    </div>
  );
}
