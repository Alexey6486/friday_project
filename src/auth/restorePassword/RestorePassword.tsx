import React, {PropsWithChildren, useState} from "react";
import sr from './RestorePassword.module.css';
import {useDispatch} from "react-redux";
import {restorePasswordTC} from "../../reducers/authReducers/restorePasswordReducer";
import {Link} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "../authStyles/authStyles.module.css";
import {Input} from "../../utils/formFields/formFields";
import {fieldRequired} from "../../utils/formValidation/formValidation";

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
        <div className={s.authFormBlock}>
            <div className={s.authFormWrap}>
                <div className={s.authFormTitle}>Restore password</div>
                <ReduxRestorePasswordForm onSubmit={onSubmit}/>
            </div>
            {
                showPopUp &&
                <div className={sr.restorePasswordPopUp}>
                    <div className={sr.restorePasswordPopUp__content}>
                        <div className={sr.restorePasswordPopUp__info}>Follow the link that has been sent to your
                            email.
                        </div>
                        <Link to={'/login'}>OK</Link>
                    </div>
                </div>
            }
        </div>
    )
}

const RestorePasswordForm: React.FC<InjectedFormProps<RestorePasswordFormType>> = (props: PropsWithChildren<InjectedFormProps<RestorePasswordFormType>>) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.authForm}>
            <div className={s.authForm__formGroup}>
                <Field component={Input} name={'email'} type={'email'} placeholder={'enter your email address'}
                       id={'emailRestore'}
                       validate={[fieldRequired]}/>
            </div>
            <div className={s.authForm__formGroup}>
                <button>Restore</button>
            </div>
            <div className={s.authForm__info}>
                Remember password?&nbsp;<Link to={'/login'}>Sign in.</Link>
            </div>
        </form>
    )
};

const ReduxRestorePasswordForm = reduxForm<RestorePasswordFormType>({
    form: 'RestorePasswordForm'
})(RestorePasswordForm);