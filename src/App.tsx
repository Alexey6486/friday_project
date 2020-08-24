import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import {Login} from "./auth/login/Login";
import {Registration} from "./auth/registration/Registration";
import {Profile} from "./auth/profile/Profile";
import { RestorePassword } from './auth/restorePassword/RestorePassword';
import {NewPasswordWithRouter} from "./auth/newPassword/NewPassword";

export const App = () => {
  return (
    <div className="App">
        <Route exact path={'/'} render={() => <Profile/>}/>
        <Route exact path={'/login'} render={() => <Login/>}/>
        <Route exact path={'/restorePassword'} render={() => <RestorePassword/>}/>
        <Route exact path={'/registration'} render={() => <Registration/>}/>
        <Route exact path={'/setNewPassword/:token'} render={() => <NewPasswordWithRouter/>}/>
    </div>
  );
}
