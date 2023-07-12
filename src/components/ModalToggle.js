"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

export default function ModalToggle({ label, children }) {
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

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div ref={ref}>
      <button onClick={toggleModal}>{label}</button>
      {isOpen && (
        <div className="modal">
          <button onClick={handleClose}>
            <Image src="/close.svg" width={12} height={12} alt="close" />
          </button>
          {children}
        </div>
      )}
    </div>
  );
}
