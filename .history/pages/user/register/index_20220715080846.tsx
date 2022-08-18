import * as React from "react";
import { useForm } from "react-hook-form";

import Layout from '../../../layout/layout';
import styles from '../../../components/register.module.css';

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  example: string;
}

function register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data));
  }; // your form submit function which will invoke after successful validation

  // console.log(watch()); // you can watch individual input by pass the name of the input
  console.log("error", {...errors});
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <fieldset>
          <legend>Register</legend>
          <label className={styles.label}>First Name:</label>
          <input className={styles.input}
            {...register("firstName", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z ]+$/i
            })}
          />
          {errors?.firstName?.type === "required" && 
            <p className={styles.p}>This field cannot be empty</p>}
          {errors?.firstName?.type === "maxLength" && (
            <p className={styles.p}>Maximum length 20 characters</p>
          )}
          {errors?.firstName?.type === "pattern" && (
            <p className={styles.p}>Alphabetical characters only</p>
          )}
          
          <label className={styles.label}>Last Name:</label>
          <input className={styles.input}
            {...register("lastName", { pattern: /^[A-Za-z]+/i })}
          />
          {errors?.lastName?.type === "pattern" && (
            <p className={styles.p}>Alphabetical characters only</p>
          )}

          <label className={styles.label}>Age:</label>
          <input className={styles.input}
            {...register("age", { 
              min: 18,
              max: 99,
              pattern: /^[0-9]+$/
            })} 
          />
          {errors.age && (
            <p className={styles.p}>You Must be older than 18 and younger than 99 years old</p>
          )}
          <input className={styles.input} type="submit" />
        </fieldset>
      </form>
    </div>
  );
}

export default register

register.getLayout = function getLayout(page) {
  return (
    <Layout pageTitle={'Register'}>
      {page}
    </Layout>
  )
}
