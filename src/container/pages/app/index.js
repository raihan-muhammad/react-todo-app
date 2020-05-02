import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../login";
import Register from "../register";
import { Provider } from "react-redux";
import { store } from "../../../config/redux";
import Dashboard from "../dashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/react-todo-app/dashboard" component={Dashboard} />
        <Route path="/react-todo-app/register" component={Register} />
        <Route path="/react-todo-app" exact component={Login} />
      </Router>
    </Provider>
  );
}

export default App;
