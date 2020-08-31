import React from "react";
import s from './NotFound.module.scss';
import {Link} from "react-router-dom";

export const NotFound = () => {
    return (
        <div className={s.notFound}>
            <div  className={s.notFound__title}>404</div>
            <div className={s.notFound__text}>page not found</div>
            <Link  className={s.notFound__link} to={'/login'}>To login page.</Link>
        </div>
    )
}