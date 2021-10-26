/*!

=========================================================
* Material Dashboard PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import "react-app-polyfill/ie11";
// import "react-app-polyfill/stable"; // TODO: расомментить если ИЕ перестал работать

import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect } from "react-router-dom";

import { Router } from "react-router-dom";
import history from "services/history";

import AuthLayout from "layouts/Auth";
import AdminLayout from "layouts/Admin";
import StartPage from "views/Dashboard/StartPage";

import { ProtectedRoute } from "components/ProtectedRoute/ProtectedRoute";

import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path={`/auth`} component={AuthLayout} />
      <ProtectedRoute path={`/admin`} component={AdminLayout} />
      <Redirect from={`/`} to={`/admin/projects`} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
