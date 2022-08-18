import * as React from "react";
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import { ErrorMessage } from "@hookform/error-message";
import Layout from '../../layout/layout';
import styles from '../../components/register.module.css';

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
  } = useForm<IFormInput>(
    {
      criteriaMode: "all"   //display multiple errors
    }
  );

  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data));
  }; // your form submit function which will invoke after successful validation

  // console.log(watch()); // you can watch individual input by pass the name of the input
  // console.log("error", {errors});
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <fieldset>
          <legend>Register</legend>
          <label className={styles.label}>First Name:</label>
          <input className={styles.input}
            {...register("firstName", {
              required: "This field cannot be empty",
              maxLength: {
                value: 20,
                message: "Maximum length 20 characters"
              },
              pattern: {
                value: /^[A-Za-z ]+$/i,
                message: "Alphabetical characters only"
              }
            })}
          />
          <ErrorMessage
            errors={errors}
            name={"firstName"}
            render={({ messages }) => {
              console.log("messages", messages);
              return messages
                ? _.entries(messages).map(([type, message]) => (
                  <p key={type} className={styles.p}>{message}</p>
                ))
                : null;
            }}
          />

          <label className={styles.label}>Last Name:</label>
          <input className={styles.input}
            {...register("lastName", { pattern: /^[A-Za-z ]+$/i })}
          />
          {errors?.lastName?.type === "pattern" && (
            <p className={styles.p}>Alphabetical characters only</p>
          )}

          <label className={styles.label}>Age:</label>
          <input className={styles.input}
            {...register("age", { 
              min: {
                value: 18,
                message: "You must be older than 18"
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Number only"
              },
            })} 
          />
          <ErrorMessage
            errors={errors}
            name={"age"}
            render={({ messages }) => {
              console.log("messages", messages);
              return messages
                ? _.entries(messages).map(([type, message]) => (
                  <p key={type} className={styles.p}>{message}</p>
                ))
                : null;
            }}
          />
          <input className={styles.input} type="submit" value="Submit"/>
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
