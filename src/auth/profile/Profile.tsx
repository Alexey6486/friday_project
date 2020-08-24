import React from "react";
import s from './Profile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {AuthStateType, logoutTC} from "../../reducers/loginReducer";
import { Redirect } from "react-router-dom";

export const Profile = () => {

    const dispatch = useDispatch();
    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {isAuth} = authState;

    const logout = () => {
        dispatch(logoutTC())
    };

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={s.profileBlock}>
            <div className={s.profileHeader}>
                <div className={'container'}>
                    <div className={s.profileHeader__title}>Profile</div>
                    <div className={s.profileHeader__link} onClick={logout}>Logout</div>
                </div>
            </div>
        </div>
    )
}