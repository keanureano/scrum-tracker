"use client";
import { useForm } from "react-hook-form";

const Field = ({ label, id, type, register, error }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} {...register} />
    {error && <p>{error.message}</p>}
  </div>
);

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        label="Username"
        id="username"
        type="text"
        register={register("username", {
          required: "Username is required",
        })}
        error={errors.username}
      />

      <Field
        label="Password"
        id="password"
        type="password"
        register={register("password", {
          required: "Password is required",
        })}
        error={errors.password}
      />

      <input type="submit" value="Log In" />
    </form>
  );
}
