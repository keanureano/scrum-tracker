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
  const [issues, setIssues] = useState(null);

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

  const getLocalIssues = () => {
    const localStorageIssues = localStorage.getItem("issues");
    if (!localStorageIssues) return null;
    const parsedData = JSON.parse(localStorageIssues);
    setIssues(parsedData.issues);
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
    getLocalIssues();
    console.log(issues)
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
      <IssuesForm onChange={getLocalIssues} />
      <PreviewPanel users={users} issues={issues} />
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
      <p>Yesterday: </p>
      <input {...register("yesterday")} />
      <p>Impediments: </p>
      <input {...register("impediments")} />
    </form>
  );
}

function IssuesForm({ onChange }) {
  const { register, handleSubmit, watch, setValue } = useForm({
    values: {
      issues: "",
    },
  });

  useFormPersist(`issues`, {
    watch,
    setValue,
    storage: window.localStorage,
  });

  return (
    <form onChange={handleSubmit(onChange)}>
      <p>Issues: </p>
      <input {...register("issues")} />
    </form>
  );
}

function PreviewPanel({ users, issues }) {
  return (
    <div>
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No user found</p>
      ) : (
        <>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Task Today</th>
              <th>Task Yesterday</th>
              <th>Impediments</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.today}</td>
                <td>{user.yesterday}</td>
                <td>{user.impediments}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Issues: </h3>
        <p>{issues}</p>
        </>
      )}
    </div>
  );
}
