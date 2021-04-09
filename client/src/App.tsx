import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./context";

import Home from "./routes/Home";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import NavBar from "./components/NavBar";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
