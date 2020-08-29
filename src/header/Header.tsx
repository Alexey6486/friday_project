import React from "react";
import s from './Header.module.scss';
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutTC} from "../reducers/authReducers/loginReducer";

type RoutePropsType = {}
type OtherPropsType = {}
type PropsType = RouteComponentProps<RoutePropsType> & OtherPropsType;

const HeaderComponent = (props: PropsType) => {

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutTC())
    };

    const {history} = props;
    const currentUrl = history.location.pathname;

    return (
        <div className={s.header}>
            <div className={'container'}>
                <div className={s.headerNav}>
                    <Link to={'/'}
                          className={currentUrl === '/' ? `${s.headerNav__link} ${s.active}` : `${s.headerNav__link}`}>Profile</Link>
                    <Link to={'/packs'}
                          className={currentUrl === '/packs' ? `${s.headerNav__link} ${s.active}` : `${s.headerNav__link}`}>Packs</Link>
                    <Link to={'/cards'}
                          className={currentUrl === '/cards' ? `${s.headerNav__link} ${s.active}` : `${s.headerNav__link}`}>Cards</Link>
                </div>
                <div className={s.header__logout} onClick={logout}>Logout</div>
            </div>
        </div>
    )
}

export const Header = withRouter(HeaderComponent);