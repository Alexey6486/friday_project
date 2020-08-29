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
import { Route, Switch } from 'react-router-dom';
import {Header} from "../header/Header";
import {AuthStateType} from "../reducers/loginReducer";
import { Packs } from "../packs/Packs";
import { Cards } from "../cards/Cards";

export const App = () => {

    const dispatch = useDispatch();
    const appState = useSelector<AppRootStateType, AppStateType>(state => state.appReducer);
    const {isInit} = appState;

    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {isAuth} = authState;

    useEffect(() => {
        dispatch(appInitializedTC());
    }, [dispatch]);

    if (!isInit) {
        return <AppInitLoading/>;
    }

    return (
        <div className="App">
            {isAuth && <Header/>}
            <Switch>
                <Route exact path={'/'} render={() => <Profile/>}/>
                <Route exact path={'/packs'} render={() => <Packs/>}/>
                <Route exact path={'/cards'} render={() => <Cards/>}/>
                <Route exact path={'/login'} render={() => <Login/>}/>
                <Route exact path={'/restorePassword'} render={() => <RestorePassword/>}/>
                <Route exact path={'/registration'} render={() => <Registration/>}/>
                <Route exact path={'/set-new-password/:token'} render={() => <NewPasswordWithRouter/>}/>
            </Switch>
        </div>
    );
}
