import React from "react";
import s from "./Card.module.scss";

type PropsType = {
    question: string
    answer: string
    created: string
    checkIfPackIsYours: number
    id: string
    cardsPack_id: string
    toggleEditPackPopUp: (id: string) => void
    toggleDeleteCardPopUp: (id: string, cardsPack_id: string) => void
}

export const Card = (props: PropsType) => {

    const {answer, created, question, checkIfPackIsYours, toggleEditPackPopUp, id, cardsPack_id, toggleDeleteCardPopUp} = props;

    const deleteCard = () => {
        toggleDeleteCardPopUp(id, cardsPack_id);
    }
    const editPackHandler = () => {
        toggleEditPackPopUp(id);
    }

    const disabledDeleteBtn = checkIfPackIsYours > 0 ? `${s.card__btn} ${s.card__btn_del}` : `${s.card__btn} ${s.disabled}`;
    const disabledEditBtn = checkIfPackIsYours > 0 ? `${s.card__btn} ${s.card__btn_edit}` : `${s.card__btn} ${s.disabled}`;

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