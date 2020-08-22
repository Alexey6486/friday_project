import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import {Login} from "./auth/login/Login";

export const App = () => {
  return (
    <div className="App">
        <Route exact path={'/login'} render={() => <Login/>}/>
        <Route exact path={'/restorePassword'} />
    </div>
  );
}
