"use client";
import React, { useEffect, useState } from "react";

export default function UserData() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const storedData = Object.keys(localStorage).filter(key => key.startsWith('user/')).map(key => JSON.parse(localStorage.getItem(key)));
      if (storedData) {
        setUserData(storedData);
      }
    };

    fetchData();

    
  }, []);

  return (
    <div>
      <h2>User Data:</h2>
      {userData.length === 0 ? (
        <p>No user data found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Task Today</th>
              <th>Task Yesterday</th>
              <th>Impediments</th>
              <th>Issues</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.today}</td>
                <td>{user.yesterday}</td>
                <td>{user.impediments}</td>
                <td>{user.issues}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
