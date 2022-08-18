import * as React from "react";
import { useForm } from "react-hook-form";

// import "./styles.css";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  example: string;
}

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data));
  }; // your form submit function which will invoke after successful validation

  console.log(watch()); // you can watch individual input by pass the name of the input

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Register</legend>
        <label>First Name</label>
        <input
          {...register("firstName", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i
          })}
        />
        {errors?.firstName?.type === "required" && <p>This field is required</p>}
        {errors?.firstName?.type === "maxLength" && (
          <p>First name cannot exceed 20 characters</p>
        )}
        {errors?.firstName?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        <label>Last Name</label>
        <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
        {errors?.lastName?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        <label>Age</label>
        <input {...register("age", { min: 18, max: 99 })} />
        {errors.age && (
          <p>You Must be older then 18 and younger then 99 years old</p>
        )}
        <input type="submit" />
      </fieldset>
    </form>
  );
}

export default App
