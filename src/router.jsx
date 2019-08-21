import React from "react";
import AuthController from "./authController";
import{ Switch, Route } from "react-router-dom";
import Home from "pages/home/container";
import Connect from "pages/user/connect";
import CreateUser from "pages/user/create";

const AppRouter = () => {
  return (
    <AuthController>
      <Switch>
          <Route path="/home" component={ Home }/>
          <Route path="/connect" component={ Connect }/>
          <Route path="/subscribe" component={ CreateUser }/>
      </Switch>
    </AuthController>
  )
}

export default AppRouter;
