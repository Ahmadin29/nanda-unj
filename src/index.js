/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Dosen from "layouts/Dosen";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.10.0";
import Login from "login";
import Cookies from "js-cookie";
import Mahasiswa from "layouts/Mahasiswa";

const checkSession = ()=>{
  const session = localStorage.getItem('session');

  if (session) {

    const role = JSON.parse(session).role

    return "/"+role
  }else{
    return "/login"
  }
}

const routerBaseName = process.env.PUBLIC_URL;

ReactDOM.render(
  <BrowserRouter basename={routerBaseName}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route path="/dosen" component={Dosen} />
      <Route path="/mahasiswa" component={Mahasiswa} />
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to={checkSession()} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
