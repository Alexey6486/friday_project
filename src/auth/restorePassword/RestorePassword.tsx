import React, {PropsWithChildren, useState} from "react";
import sr from './RestorePassword.module.css';
import {useDispatch} from "react-redux";
import {restorePasswordTC} from "../../reducers/restorePasswordReducer";
import {NavLink} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "../login/Login.module.css";
import {Input} from "../../utils/formFields/formFields";
import {fieldRequired} from "../../utils/formValidation/loginValidation";

type RestorePasswordFormType = {
    email: string
}

export const RestorePassword = () => {

    const [showPopUp, setShowPopUp] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = (restoreData: RestorePasswordFormType) => {
        dispatch(restorePasswordTC(restoreData.email));
        setShowPopUp(true);
    }

    return (
        <div className={s.loginFormBlock}>
            <div className={s.loginFormWrap}>
                <div className={s.loginFormTitle}>Restore password:</div>
                <ReduxRestorePasswordForm onSubmit={onSubmit}/>
            </div>
            {
                showPopUp &&
                <div className={sr.restorePasswordPopUp}>
                    <div className={sr.restorePasswordPopUp__content}>
                        <div className={sr.restorePasswordPopUp__info}>Follow the link that has been sent to your
                            email.
                        </div>
                        <NavLink to={'login'}>OK</NavLink>
                    </div>
                </div>
            }
        </div>
    )
}
const RestorePasswordForm: React.FC<InjectedFormProps<RestorePasswordFormType>> = (props: PropsWithChildren<InjectedFormProps<RestorePasswordFormType>>) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.loginForm}>
            <div className={s.loginForm__formGroup}>
                <Field component={Input} name={'email'} type={'email'} placeholder={'email'} id={'emailRestore'}
                       validate={[fieldRequired]}/>
            </div>
            <div className={s.loginForm__formGroup}>
                <button>Restore</button>
            </div>
            <div className={s.loginForm__info}>
                Remember password?&nbsp;<NavLink to={'/login'}>Sign in.</NavLink>
            </div>
        </form>
    )
};

const ReduxRestorePasswordForm = reduxForm<RestorePasswordFormType>({
    form: 'RestorePasswordForm'
})(RestorePasswordForm);