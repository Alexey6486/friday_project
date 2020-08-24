import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import {Login} from "./auth/login/Login";
import {Registration} from "./auth/registration/Registration";
import {Profile} from "./auth/profile/Profile";

export const App = () => {
  return (
    <div className="App">
        <Route exact path={'/'} render={() => <Profile/>}/>
        <Route exact path={'/login'} render={() => <Login/>}/>
        <Route exact path={'/restorePassword'} />
        <Route exact path={'/registration'} render={() => <Registration/>}/>
    </div>
  );
}
