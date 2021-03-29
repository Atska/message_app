import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { LOGIN_USER } from "../graphql/mutations/login.mutation";
import "./Login.css";

interface ILogin {
  username: string;
  email: string;
  password: string;
}

function Login() {
  const [values, setValues] = useState<ILogin>({
    username: "",
    email: "",
    password: "",
  });
  //Used for redirecting to "/"
  let history = useHistory();

  const [login] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log(result.data);
    },
    variables: {
      username: values.username,
      email: values.email,
      password: values.password,
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    login();
    history.push("/");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-container">
      <div className="title-login">
        <h3>Log In To Your Account</h3>
      </div>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
          ></input>
          <input
            className="login-input"
            type="text"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          ></input>
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          ></input>
          <div className="login-btn">
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
