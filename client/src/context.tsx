import * as React from "react";

interface IAuth {
  user: null | any;
  login: (userData: any) => void;
  logout: () => void;
}
/**
 * Context provides a way to pass data through the component tree without
 * having to pass props down manually at every level.
 */
const AuthContext: React.Context<IAuth> = React.createContext({
  user: null,
  login: (userData: any) => {},
  logout: () => {},
});

/**
 * Reducer to check if data of the user from the jwt token is valid or not
 * @param state
 * @param action
 * @returns
 */
const AuthReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

const AuthProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(AuthReducer, { user: null });

  const login = (userData: any) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
