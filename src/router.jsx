import React from "react";
import{ Switch, Route, Redirect } from "react-router-dom";
import Home from "pages/home/container";
import Connect from "pages/user/connect";
import CreateUser from "pages/user/create";

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/home" component={ Home }/>

      <Route path="/connect" component={ Connect }/>
      <Route path="/subscribe" component={ CreateUser }/>

      <Redirect to="/home"/>
    </Switch>
  )
}

export default AppRouter;
