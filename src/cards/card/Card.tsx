import React from "react";
import s from "./Card.module.scss";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {AuthStateType} from "../../reducers/authReducers/loginReducer";

type PropsType = {
    question: string
    answer: string
    created: string
    id: string
    cardsPack_id: string
    toggleEditCardPopUp: (id: string, args: Array<string>) => void
    toggleDeleteCardPopUp: (id: string, cardsPack_id: string) => void
    userId: string
}

export const Card = (props: PropsType) => {

    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {userProfile} = authState;

    const {answer, created, question, toggleEditCardPopUp, id, cardsPack_id, toggleDeleteCardPopUp, userId} = props;

    const deleteCard = () => {
        toggleDeleteCardPopUp(id, cardsPack_id);
    }
    const editPackHandler = () => {
        toggleEditCardPopUp(id, [question, answer]);
    }

    const disabledDeleteBtn = userId === userProfile._id ? `${s.card__btn} ${s.card__btn_del}` : `${s.card__btn} ${s.disabled}`;
    const disabledEditBtn = userId === userProfile._id ? `${s.card__btn} ${s.card__btn_edit}` : `${s.card__btn} ${s.disabled}`;

    return (
        <div className={s.card}>
            <div className={s.card__row}>
                <div>{question}</div>
                <div>{answer}</div>
                <div>{created}</div>
            </div>
            <div className={s.card__interface}>
                <button className={disabledEditBtn} onClick={editPackHandler}>Edit</button>
                <button className={disabledDeleteBtn} onClick={deleteCard}>Delete</button>
            </div>
        </div>
    )
}