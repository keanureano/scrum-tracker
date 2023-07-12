
'use client'
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function SearchBar({ onSearch }) {
  const { register, handleSubmit } = useForm();
  const [userResults, setUserResults] = useState(null);
  const [dateResults, setDateResults] = useState(null);

  const onSubmit = (data) => {
    handleSearch(data);
    console.log(data);
  };

  const handleSearch = (data) => {
    console.log("Search data:", data);
    if (onSearch) {
      onSearch(data);
    }

 
    setUserResults(`User results: ${data.name}`);
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Select Name:</label>
        <select {...register('name')} id="name">
          <option value="">Select Name</option>
          <option value="John">John</option>
          <option value="Doe">Doe</option>
          <option value="Pie">Pie</option>
        </select>
      </div>

      <button type="submit">Search</button>

      <div>
        {userResults && <p>{userResults}</p>}
      </div>

      <div>
        <label htmlFor="fromDate">From:</label>
        <input type="date" {...register('fromDate')}  />
      </div>

      <div>
        <label htmlFor="toDate">To:</label>
        <input type="date" {...register('toDate')}  />
      </div>

      <button type="submit">Search</button>

      <div>
        {dateResults && <p>{dateResults}</p>}
      </div>
    </form>
  );
}
