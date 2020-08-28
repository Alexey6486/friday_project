import React, {PropsWithChildren, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {registrationTC, RegistrationInitialStateType, errorTC} from "../../reducers/registrationReducer";
import {AppRootStateType} from "../../store/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../utils/formFields/formFields";
import {fieldRequired, minLength} from "../../utils/formValidation/formValidation";
import s from "../authStyles/authStyles.module.css";
import {AuthLoading} from "../../utils/loading/authLoading/AuthLoading";

type regFormType = {
    email: string
    password: string
    repeatPassword: string
}

export const Registration: React.FC = () => {

    const dispatch = useDispatch();
    const registrationState = useSelector<AppRootStateType, RegistrationInitialStateType>(store => store.registrationReducer);
    const {error, registrationSuccess, isLoading} = registrationState;

    const onSubmit = (registrationData: regFormType) => {
        if (registrationData.password === registrationData.repeatPassword) {
            dispatch(registrationTC(registrationData.email, registrationData.password))
        } else {
            dispatch(errorTC());
            return;
        }
    };

    if (registrationSuccess) {
        return <Redirect to={'/login'}/>
    }

    return (

        <div className={s.authFormBlock}>
            <div className={s.authFormWrap}>
                <div className={s.authFormTitle}>Registration</div>

                {
                    registrationSuccess
                        ? <Redirect to={'/login'}/>
                        : <ReduxRegistrationForm onSubmit={onSubmit}/>
                }
                {
                    isLoading &&
                    <AuthLoading/>
                }
            </div>
            {
                error &&
                <div className={s.authFormError}>
                    {error}
                </div>
            }
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
                    Have an account?&nbsp;<Link to={'/login'}>Sign in.</Link>
                </div>
            </form>
        )
    };

const ReduxRegistrationForm = reduxForm<regFormType>({
    form: 'RegistrationForm'
})(RegistrationForm);

