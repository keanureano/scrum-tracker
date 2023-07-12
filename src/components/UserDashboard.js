"use client";

import { useForm } from "react-hook-form";
import DropdownToggle from "./DropdownToggle";
import ModalToggle from "./ModalToggle";

export default function UserDashboard({ username }) {
  return (
    <DropdownToggle label={`Welcome ${username}`}>
      <div className="user-dashboard">
        <ChangeEmailModal />
        <ChangePasswordModal />
        <SignOutButton />
      </div>
    </DropdownToggle>
  );
}

function ChangeEmailModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <ModalToggle label="Change Email">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </ModalToggle>
  );
}

function ChangePasswordModal() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const validatePasswordMatch = (value) => {
    const password = watch("password");
    return value === password || "The passwords do not match";
  };

  return (
    <ModalToggle label="Change Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: validatePasswordMatch,
            })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </ModalToggle>
  );
}

function SignOutButton() {
  return (
    <form action="/api/auth/signout">
      <input type="submit" value="Sign Out" />
    </form>
  );
}
