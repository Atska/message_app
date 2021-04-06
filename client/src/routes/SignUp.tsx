import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ApolloError, useMutation } from "@apollo/client";

import { SIGNUP_USER } from "../graphql/mutations/signup.mutation";
import "./SignUp.css";

interface IValue {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUp() {
  const [errors, setErrors] = useState<string[]>([]);
  const [values, setValues] = useState<IValue>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let history = useHistory();

  const [signUp] = useMutation(SIGNUP_USER, {
    update(proxy, result) {
      if (result) {
        setErrors([]);
        history.push("/");
      }
    },
    variables: {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    },
    onError(err: ApolloError) {
      const e: any = err.graphQLErrors[0].extensions;
      const arr: string[] | any = Object.values(e);
      arr.pop();
      arr.pop();
      setErrors(arr);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    signUp();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="signup-container">
      <div className="title-signup">
        <h3>Sign Up Your New Account</h3>
      </div>
      <div className="signup-input-container">
        <form onSubmit={handleSubmit}>
          <input
            className="signup-input"
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={values.email}
          ></input>
          <input
            className="signup-input"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            name="username"
            value={values.username}
          ></input>
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={values.password}
          ></input>
          <input
            className="input"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            name="confirmPassword"
            value={values.confirmPassword}
          ></input>
          <div className="signup-btn">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
      <div className="error-container">
        <ul className="error-list">
          {errors.map((err: string, id: number) => {
            return (
              <li key={id} className="error-msg">
                {err}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SignUp;
