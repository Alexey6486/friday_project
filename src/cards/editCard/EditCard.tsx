import React, {PropsWithChildren} from "react";
import s from './EditCard.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "../../utils/formFields/formFields";
import {EditCardObject} from "../../api/cardsApi";
import {CardsStateType, editCardTC} from "../../reducers/cardsReducer/cardsReducer";

type PropsType = {
    toggleEditCardPopUp: (_id: string, args: Array<string>) => void
    id: string
    cardsPack_id: string
    question: string
    answer: string
}
// type ExtraProps = {
//     question: string
//     answer: string
// }

export const EditCard = (props: PropsType) => {

    const {toggleEditCardPopUp, id, cardsPack_id, answer, question} = props;

    const dispatch = useDispatch();
    const cardsState = useSelector<AppRootStateType, CardsStateType>(state => state.cardsReducer);
    const {fromCardsServer} = cardsState;

    const onSubmit = (formData: EditCardObject) => {
        dispatch(editCardTC(
            {
                page: fromCardsServer.page,
                pageCount: fromCardsServer.pageCount,
                cardsPack_id,
            },
            {
                _id: id,
                question: formData.question,
                answer: formData.answer,
                comments: formData.comments,
            }));
        toggleEditCardPopUp('', []);
    }

    const onClose = () => {
        toggleEditCardPopUp('', [])
    }

    return (
        <div className={s.editCard}>
            <div className={s.editCard__formWrap}>
                <div className={s.close} onClick={onClose}></div>
                <EditCardReduxForm onSubmit={onSubmit} initialValues={{question, answer}}/>
            </div>
        </div>
    )
};

const EditCardForm: React.FC<InjectedFormProps<EditCardObject>> = (props: PropsWithChildren<InjectedFormProps<EditCardObject>>) => {

    return (
        <form className={s.editCard__form} onSubmit={props.handleSubmit}>
            <div className={s.editCard__formGroup}>
                <Field component={Input} type={'text'} name={'question'} placeholder={'change question'}/>
            </div>
            <div className={s.editCard__formGroup}>
                <Field component={Input} type={'text'} name={'answer'} placeholder={'change answer'}/>
            </div>
            <div className={s.editCard__formGroup}>
                <Field component={Textarea} type={'text'} name={'comments'} placeholder={'comment'}/>
            </div>
            <button>Save</button>
        </form>
    )
};


const EditCardReduxForm = reduxForm<EditCardObject>({
    form: 'EditCardForm'
})(EditCardForm);
