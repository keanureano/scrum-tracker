"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";

const userList = [
  { id: "1", username: "user1", role: "admin" },
  { id: "2", username: "user2", role: "user" },
  { id: "3", username: "user3", role: "user" },
  { id: "4", username: "user4", role: "admin" },
  { id: "5", username: "user5", role: "user" },
  { id: "6", username: "user6", role: "user" },
];

export default function HomePage() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <main>
      <div>Users: </div>
      {userList.map((user) => (
        <button
          key={user.id}
          onClick={() => handleUserClick(user.username)}
          className={selectedUser === user.username ? "selected" : ""}
        >
          {user.username}
        </button>
      ))}
      {selectedUser && <User user={selectedUser} />}
    </main>
  );
}

function User({ user }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  useFormPersist(user, {
    watch,
    setValue,
    storage: window.localStorage, // default window.sessionStorage
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{user}</h1>
      <Field
        label="Task Today: "
        id="today"
        type="text"
        register={register("today")}
        error={errors.today}
      />

      <Field
        label="Task Yesterday: "
        id="yesterday"
        type="text"
        register={register("yesterday")}
        error={errors.yesterday}
      />

      <Field
        label="Impediments: "
        id="impediments"
        type="text"
        register={register("impediments")}
        error={errors.impediments}
      />

      <Field
        label="Issues: "
        id="issues"
        type="text"
        register={register("issues")}
        error={errors.issues}
      />

      <input type="submit" value="Save to Database" />
    </form>
  );
}

function Field({ label, id, type, register, error }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} {...register} />
      {error && <p>{error.message}</p>}
    </div>
  );
}
