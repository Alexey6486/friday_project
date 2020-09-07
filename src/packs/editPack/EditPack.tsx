import React, {PropsWithChildren} from "react";
import s from './EditPack.module.scss';
import {useDispatch} from "react-redux";
import {editPackTC} from "../../reducers/packsReducer/packsReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {EditPackObject} from "../../api/packsApi";
import {Input} from "../../utils/formFields/formFields";
import {fieldRequired} from "../../utils/formValidation/formValidation";

type PropsType = {
    toggleEditPackPopUp: (_id: string, args: Array<string>) => void
    id: string
    name: string
}

export const EditPack = (props: PropsType) => {

    const {toggleEditPackPopUp, id, name} = props;

    const dispatch = useDispatch();

    const onSubmit = (formData: EditPackObject) => {
        dispatch(editPackTC({_id: id, name: formData.name,}));
        toggleEditPackPopUp('', []);
    }

    const onClose = () => {
        toggleEditPackPopUp('', [])
    }

    return (
        <div className={s.editPack}>
            <div className={s.editPack__formWrap}>
                <div className={s.close} onClick={onClose}></div>
                <EditPackReduxForm onSubmit={onSubmit} initialValues={{name}}/>
            </div>
        </div>
    )
};

const EditPackForm: React.FC<InjectedFormProps<EditPackObject>> = (props: PropsWithChildren<InjectedFormProps<EditPackObject>>) => {

    return (
        <form className={s.editPack__form} onSubmit={props.handleSubmit}>
            <div className={s.editPack__formGroup}>
                <Field component={Input} type={'text'} name={'name'} placeholder={'new pack name'} value={'test'}
                       validate={[fieldRequired]}/>
            </div>
            <button>Save</button>
        </form>
    )
};

const EditPackReduxForm = reduxForm<EditPackObject>({
    form: 'EditPackForm'
})(EditPackForm);