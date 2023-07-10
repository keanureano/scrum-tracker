'use client'
import React, { useState } from "react";

export default function Dropdown({ user }){
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const options = [
    { value: "1", label: "Change Email" },
    { value: "2", label: "Change Password" },
    { value: "3", label: "Log Out" },
  ];

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
  };

  const openModal = () => {
    if (selectedOption === "Change Email") {
      setIsOpen(false);
    }
  };

  const closeModal = () => {
    setSelectedOption("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New email:", newEmail);
    setNewEmail("");
    closeModal();


  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {user}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item user-item">{user}</div>
          <div className="dropdown-divider"></div>
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => selectOption(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {user && (
        <div>
          {selectedOption === "Change Email" && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <h2>Change Email</h2>
                <form onSubmit={handleSubmit}>
                  <label>
                    New Email:
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      required
                    />
                  </label>
                  <button type="submit">Change Email</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

