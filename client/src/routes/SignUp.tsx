import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { SIGNUP_USER } from "../graphql/mutations/signup.mutation";
import "./SignUp.css";

interface ISignUp {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUp() {
  const [values, setValues] = useState<ISignUp>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let history = useHistory();

  const [signUp] = useMutation(SIGNUP_USER, {
    update(proxy, result) {
      console.log(result.data);
    },
    variables: {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("kek");
    signUp();
    history.push("/");
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
    </div>
  );
}

export default SignUp;
