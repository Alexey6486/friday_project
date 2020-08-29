import React from "react";
import s from './Pack.module.scss';
import {CardInPackType} from "../../api/packsApi";

type PropsType = CardInPackType;

export const Pack = (props: PropsType) => {

    const {name, cardsCount, updated, created} = props;

    return (
        <div className={s.pack}>
            <div>Pack name: {name}</div>
            <div>Cards count: {cardsCount}</div>
            <div>Updated: {updated}</div>
            <div>Created: {created}</div>
        </div>
    )
}