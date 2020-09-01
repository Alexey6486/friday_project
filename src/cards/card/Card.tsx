import React from "react";
import s from "./Card.module.scss";

type PropsType = {
    question: string
    answer: string
    created: string
    checkIfPackIsYours: number
}

export const Card = (props: PropsType) => {

    const {answer, created, question, checkIfPackIsYours} = props;

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
                <button className={disabledEditBtn}>Edit</button>
                <button className={disabledDeleteBtn}>Delete</button>
            </div>
        </div>
    )
}