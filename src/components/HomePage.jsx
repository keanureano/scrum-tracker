"use client";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";


export default function HomePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  useFormPersist("storageKey", {
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
