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

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState("");

  const getLocalState = () => {
    const localStorageUsers = Object.keys(localStorage)
      .filter((key) => key.startsWith("users/"))
      .map((key) => JSON.parse(localStorage.getItem(key)))
      .sort((a, b) => a.username.localeCompare(b.username));

    setUsers(localStorageUsers);

    const storedIssues = localStorage.getItem("issues");
    setIssues(storedIssues ? JSON.parse(storedIssues).issues : "");
  };

  const clearUser = () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(`users/${selectedUser}`))
      .forEach((key) => localStorage.removeItem(key));

    getLocalState();
    setSelectedUser(null);
  };

  useEffect(() => {
    getLocalState();
  }, []);

  return (
    <main>
      <h1>Home</h1>
      <UserNavList
        userList={userList}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      {selectedUser && (
        <UserForm
          onChange={getLocalState}
          clearUser={clearUser}
          selectedUser={selectedUser}
        />
      )}
      <IssuesForm onChange={getLocalState} />
      <PreviewPanel users={users} issues={issues} />
      <DatabaseButton users={users} issues={issues} />
      <EmailButton users={users} issues={issues} />
    </main>
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

function UserForm({ selectedUser, onChange, clearUser }) {
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
      <h2>{selectedUser}</h2>
      <button type="button" onClick={clearUser}>
        Clear
      </button>
      <input type="hidden" {...register("username")} />
      <p>Today: </p>
      <input {...register("today")} />
      <p>Yesterday: </p>
      <input {...register("yesterday")} />
      <p>Impediments: </p>
      <input {...register("impediments")} />
    </form>
  );
}

function IssuesForm({ onChange }) {
  const { register, handleSubmit, watch, setValue } = useForm({});

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
      <h3>Users:</h3>
      {users.length !== 0 && (
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
      )}
      <h3>Issues: </h3>
      {issues && <p>{issues}</p>}
    </div>
  );
}

function DatabaseButton({ users, issues }) {
  const onSubmit = () => {
    const data = { reports: users, issues: issues };
    console.log(data);
  };
  return <button onClick={onSubmit}>Save to Database</button>;
}

function EmailButton({ users, issues }) {
  const onSubmit = () => {
    const data = { reports: users, issues: issues };
    console.log(data);
  };
  return <button onClick={onSubmit}>Email</button>;
}
