import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import {createStore} from "./state";

const ApplicationRoute = (props) => (
  <Router basename="/paiemoi">
    <App/>
  </Router>
)
const start = (application) => {
  ReactDOM.render(application, document.getElementById('root'));
}

const store = createStore();

start(
  <Provider store={ store }>
    <Router>
      <Switch>
        <Route component = { ApplicationRoute } path="/paiemoi"/>
        <Redirect to="/paiemoi"/>
      </Switch>
    </Router>
  </Provider>
)
