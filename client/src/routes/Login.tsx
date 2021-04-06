import { ApolloError, useMutation } from "@apollo/client";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context";
import { LOGIN_USER } from "../graphql/mutations/login.mutation";
import "./Login.css";

interface IValue {
  username: string;
  email: string;
  password: string;
}

function Login() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState<string[]>([]);
  const [values, setValues] = useState<IValue>({
    username: "",
    email: "",
    password: "",
  });
  //Used for redirecting to "/"
  let history = useHistory();
  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      if (result) {
        setErrors([]);
        context.login(result.data.login);
        history.push("/");
      }
    },
    onError(err: ApolloError) {
      //Important: This error handling is a workaround because if existingEmail object from the backend
      // returning and obj{existingEmail: ...} not a string!
      const e: any = err.graphQLErrors[0].extensions;
      const arr: string[] | any = Object.values(e);
      if (arr[0].existingUser) {
        const result: string[] = [arr[0].existingUser];
        setErrors(result);
      } else if (arr[0].correctPW) {
        const result: string[] = [arr[0].correctPW];
        setErrors(result);
      } else {
        arr.pop();
        arr.pop();
        setErrors(arr);
      }
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
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  if (loading) return <h1>Loading</h1>;

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

export default Login;
