import React, {PropsWithChildren} from "react";
import s from './Login.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../utils/formFields/formFields";
import { NavLink, Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AuthStateType, loginTC} from "../../reducers/loginReducer";
import {AppRootStateType} from "../../store/store";
import { fieldRequired } from "../../utils/formValidation/loginValidation";

type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const dispatch = useDispatch();
    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {isAuth} = authState;

    const onSubmit = (loginData: LoginFormType) => {
        dispatch(loginTC(loginData.email, loginData.password, loginData.rememberMe));
    }

    if (isAuth) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className={s.loginFormBlock}>
            <div className={s.loginFormWrap}>
                <div className={s.loginFormTitle}>Login:</div>
                <ReduxLoginForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
};

const LoginForm: React.FC<InjectedFormProps<LoginFormType>> = (props: PropsWithChildren<InjectedFormProps<LoginFormType>>) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.loginForm}>
            <div className={s.loginForm__formGroup}>
                <Field component={Input} name={'email'} type={'email'} placeholder={'email'} id={'emailLogin'} validate={[fieldRequired]}/>
            </div>
            <div className={s.loginForm__formGroup}>
                <Field component={Input} name={'password'} type={'password'} placeholder={'password'} id={'passwordLogin'} validate={[fieldRequired]}/>
            </div>
            <div className={s.loginForm__info}>
                <NavLink to={'/restorePassword'}>Forgot password?</NavLink>
            </div>
            <div className={s.loginForm__checkboxGroup}>
                <Field component={Input} name={'rememberMe'} type={'checkbox'} id={'checkboxLogin'}/>
                <label htmlFor="checkboxLogin">Remember Me</label>
            </div>
            <div className={s.loginForm__formGroup}>
                <button>Login</button>
            </div>
        </form>
    )
};

const ReduxLoginForm = reduxForm<LoginFormType>({
    form: 'LoginForm'
})(LoginForm);