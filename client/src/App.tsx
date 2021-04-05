import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./routes/Home";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import NavBar from "./components/NavBar";
import "./App.css";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
