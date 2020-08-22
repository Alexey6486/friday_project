import React from "react";

const FormField = (Element: string) => ({input, meta, ...props}: any) => {

    const error = meta.touched && meta.error;

    return (
        <>
            <Element {...input} {...props}/>
            {
                error &&
                <div>{meta.error}</div>
            }
        </>
    )
};

export const Input = FormField('input');