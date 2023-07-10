"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";

const userList = [
  { username: "user1", role: "admin" },
  { username: "user2", role: "user" },
  { username: "user3", role: "user" },
  { username: "user4", role: "admin" },
  { username: "user5", role: "user" },
  { username: "user6", role: "user" },
];

export default function UserPanel() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const getLocalUsers = () => {
    const localStorageUsers = Object.keys(localStorage)
      .filter((key) => key.startsWith("users/"))
      .map((key) => {
        const localStorageData = localStorage.getItem(key);
        if (!localStorageData) return null;
        return JSON.parse(localStorageData);
      })
      .sort((a, b) => a.username.localeCompare(b.username));

    setUsers(localStorageUsers);
  };

  const clearLocalUsers = () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("users/"))
      .forEach((key) => {
        localStorage.removeItem(key);
      });

    setUsers([]);
    setSelectedUser(null);
  };

  useEffect(() => {
    getLocalUsers();
  }, []);

  return (
    <>
      <UserNavList
        userList={userList}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <ClearUsersButton onClick={clearLocalUsers} />
      {selectedUser && (
        <UserForm onChange={getLocalUsers} selectedUser={selectedUser} />
      )}
      <PreviewPanel users={users} />
    </>
  );
}

function UserNavList({ userList, selectedUser, setSelectedUser }) {
  return (
    <>
      {userList.map((user) => (
        <button
          key={user.username}
          onClick={() => setSelectedUser(user.username)}
          disabled={selectedUser === user.username}
        >
          {user.username}
        </button>
      ))}
    </>
  );
}

function ClearUsersButton({ onClick }) {
  return (
    <div>
      <button onClick={onClick}>Clear All User Inputs</button>
    </div>
  );
}

function UserForm({ selectedUser, onChange }) {
  const { register, handleSubmit, watch, setValue } = useForm({
    values: {
      username: selectedUser,
      today: "",
      yesterday: "",
      impediments: "",
    },
  });

  useFormPersist(`users/${selectedUser}`, {
    watch,
    setValue,
    storage: window.localStorage,
  });

  return (
    <form onChange={handleSubmit(onChange)}>
      <h1>{selectedUser}</h1>
      <input type="hidden" {...register("username")} />
      <input {...register("today")} />
      <input {...register("yesterday")} />
      <input {...register("impediments")} />
    </form>
  );
}

function PreviewPanel({ users }) {
  return (
    <div>
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No user found</p>
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
            {users.map((user, index) => (
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
