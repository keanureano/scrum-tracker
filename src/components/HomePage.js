"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";

export default function HomePage() {
  const userList = [
    { id: "1", username: "user1", role: "admin" },
    { id: "2", username: "user2", role: "user" },
    { id: "3", username: "user3", role: "user" },
    { id: "4", username: "user4", role: "admin" },
    { id: "5", username: "user5", role: "user" },
    { id: "6", username: "user6", role: "user" },
  ];

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

  useFormPersist(`user/${user}`, {
    watch,
    setValue,
    storage: window.localStorage, // default window.sessionStorage
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onChange={handleSubmit(onSubmit)}>
      <Field
        label={user}
        id="username"
        type="hidden"
        value={user}
        register={register("username")}
        error={errors.username}
      />

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

function Field({ label, id, type, register, error, value }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} {...register} value={value} />
      {error && <p>{error.message}</p>}
    </div>
  );
}
