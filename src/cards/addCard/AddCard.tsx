import React, {PropsWithChildren} from "react";
import s from './AddCard.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../utils/formFields/formFields";
import {fieldRequired} from "../../utils/formValidation/formValidation";
import {CardsStateType, createCardTC} from "../../reducers/cardsReducer/cardsReducer";
import {CreateCardObject} from "../../api/cardsApi";

type PropsType = {
    toggleCreatePackPopUp: () => void
    cardsPack_id: string
}

export const AddCard = (props: PropsType) => {

    const {toggleCreatePackPopUp, cardsPack_id} = props;

    const dispatch = useDispatch();
    const cardsState = useSelector<AppRootStateType, CardsStateType>(state => state.cardsReducer);
    const {fromCardsServer} = cardsState;

    const onSubmit = (formData: CreateCardObject) => {
        dispatch(createCardTC(
            {
                page: fromCardsServer.page,
                pageCount: fromCardsServer.pageCount,
                cardsPack_id,
            },
            {
                cardsPack_id,
                question: formData.question,
                answer: formData.answer,
            }));
        toggleCreatePackPopUp();
    }

    const onClose = () => {
        toggleCreatePackPopUp()
    }

    return (
        <div className={s.createCard}>
            <div className={s.createCard__formWrap}>
                <div className={s.close} onClick={onClose}></div>
                <AddCardReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
};

const AddCardForm: React.FC<InjectedFormProps<CreateCardObject>> = (props: PropsWithChildren<InjectedFormProps<CreateCardObject>>) => {

    return (
        <form className={s.createCard__form} onSubmit={props.handleSubmit}>
            <div className={s.createCard__formGroup}>
                <Field component={Input} type={'text'} name={'question'} placeholder={'question'}
                       validate={[fieldRequired]}/>
            </div>
            <div className={s.createCard__formGroup}>
                <Field component={Input} type={'text'} name={'answer'} placeholder={'answer'}
                       validate={[fieldRequired]}/>
            </div>
            <button>Create card</button>
        </form>
    )
};

const AddCardReduxForm = reduxForm<CreateCardObject>({
    form: 'AddCardForm'
})(AddCardForm);