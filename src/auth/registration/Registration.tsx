import React, {PropsWithChildren, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {addRegistration} from "../../reducers/registrationReducer";
import {AppRootStateType} from "../../store/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../utils/formFields/formFields";
import {fieldRequired, minLength} from "../../utils/formValidation/formValidation";
import s from "../authStyles/authStyles.module.css";

type regFormType = {
    email: string
    password: string
    repeatPassword: string
}

export const Registration: React.FC = () => {
    const [check, setCheck] = useState(false);
    const dispatch = useDispatch();
    const registered = useSelector<AppRootStateType>(store => store.registrationReducer.registrationSuccess);


    const onSubmit = (registrationData: regFormType) => {
        debugger

        if (registrationData.password === registrationData.repeatPassword &&
            registrationData.password.length >= 7) {
            dispatch(addRegistration(registrationData.email, registrationData.password))
        } else {
        }
    };

    return (

        <div className={s.authFormBlock}>
            <div className={s.authFormWrap}>
                <div className={s.authFormTitle}>Registration</div>

                {
                    registered
                        ? <Redirect to={'/login'}/>
                        : <ReduxRegistrationForm onSubmit={onSubmit}/>
                }
            </div>
        </div>
    )
};

const minLengthValidation = minLength(8);
const RegistrationForm: React.FC<InjectedFormProps<regFormType>> =
    (props: PropsWithChildren<InjectedFormProps<regFormType>>) => {
        return (
            <form onSubmit={props.handleSubmit} className={s.authForm}>
                <div className={s.authForm__formGroup}>
                    <Field component={Input} type={'email'} placeholder={'email'}
                           validate={[fieldRequired]}
                           id={'registrationEmail'} name={'email'}/>
                </div>
                <div className={s.authForm__formGroup}>
                    <Field component={Input} type={'password'}
                           placeholder={'password'} validate={[fieldRequired, minLengthValidation]}
                           id={'registrationPassword'} name={'password'}/>
                </div>
                <div className={s.authForm__formGroup}>
                    <Field component={Input} placeholder={'repeat password'} type={'password'}
                           validate={[fieldRequired]}
                           id={'registrationRepeatPassword'} name={'repeatPassword'}/>
                </div>
                <div className={s.authForm__formGroup}>
                    <button>Send</button>
                </div>
                <div className={s.authForm__info}>
                    Have an account?&nbsp;<NavLink to={'/login'}>Sign in.</NavLink>
                </div>
            </form>
        )
    };

const ReduxRegistrationForm = reduxForm<regFormType>({
    form: 'RegistrationForm'
})(RegistrationForm);

