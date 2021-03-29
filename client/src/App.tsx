import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./routes/Home";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import NavBar from "./components/NavBar";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
