import React, { useEffect } from "react";
import './App.css';
import {Login} from "../auth/login/Login";
import {Registration} from "../auth/registration/Registration";
import {Profile} from "../auth/profile/Profile";
import {RestorePassword} from '../auth/restorePassword/RestorePassword';
import {NewPasswordWithRouter} from "../auth/newPassword/NewPassword";
import {AppRootStateType} from "../store/store";
import {appInitializedTC, AppStateType} from "./appReducer";
import {AppInitLoading} from "../utils/loading/appInitLoading/AppInitLoading";
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

export const App = () => {

    const dispatch = useDispatch();
    const appState = useSelector<AppRootStateType, AppStateType>(state => state.appReducer);
    const {isInit} = appState;

    useEffect(() => {
        dispatch(appInitializedTC());
    }, []);

    if (!isInit) {
        return <AppInitLoading/>;
    }

    return (
        <div className="App">
            <Route exact path={'/friday_project/'} render={() => <Profile/>}/>
            <Route exact path={'/friday_project/login'} render={() => <Login/>}/>
            <Route exact path={'/friday_project/restorePassword'} render={() => <RestorePassword/>}/>
            <Route exact path={'/friday_project/registration'} render={() => <Registration/>}/>
            <Route exact path={'/friday_project/set-new-password/:token'} render={() => <NewPasswordWithRouter/>}/>
        </div>
    );
}
