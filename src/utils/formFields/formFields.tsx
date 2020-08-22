import React from "react";
import s from './formField.module.css';

const FormField = (Element: string) => ({input, meta, ...props}: any) => {

    const error = meta.touched && meta.error;

    return (
        <>
            <Element {...input} {...props}/>
            {
                error &&
                <div className={s.formFieldError}>{meta.error}</div>
            }
        </>
    )
};

export const Input = FormField('input');