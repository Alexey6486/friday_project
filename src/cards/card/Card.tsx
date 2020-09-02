import React from "react";
import s from "./Card.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {CardsStateType, deleteCardTC} from "../../reducers/cardsReducer/cardsReducer";
import {AppRootStateType} from "../../store/store";

type PropsType = {
    question: string
    answer: string
    created: string
    checkIfPackIsYours: number
    id: string
    cardsPack_id: string
    toggleEditPackPopUp: (id: string) => void
}

export const Card = (props: PropsType) => {

    const dispatch = useDispatch()

    const cardsState = useSelector<AppRootStateType, CardsStateType>(state => state.cardsReducer);
    const {fromCardsServer} = cardsState;

    const {answer, created, question, checkIfPackIsYours, toggleEditPackPopUp, id, cardsPack_id} = props;

    const deletePack = () => {
        dispatch(deleteCardTC({page: fromCardsServer.page, pageCount: fromCardsServer.pageCount, cardsPack_id}, id))
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
                <button className={disabledDeleteBtn} onClick={deletePack}>Delete</button>
            </div>
        </div>
    )
}