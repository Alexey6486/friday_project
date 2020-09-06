import React from "react";
import s from './Pack.module.scss';
import {CardInPackType} from "../../api/packsApi";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {AuthStateType} from "../../reducers/authReducers/loginReducer";
import {Link} from "react-router-dom";

type PropsType = CardInPackType & {
    toggleEditPackPopUp: (_id: string, args: Array<string>) => void
    toggleDeletePackPopUp: (id: string) => void
};

export const Pack = (props: PropsType) => {

    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {userProfile} = authState;

    const {name, cardsCount, created, _id, user_id, toggleEditPackPopUp, toggleDeletePackPopUp} = props;

    const deletePack = (id: string) => {
        toggleDeletePackPopUp(id);
    }
    const editPackHandler = () => {
        toggleEditPackPopUp(_id, [name]);
    }

    const disabledDeleteBtn = userProfile._id === user_id ? `${s.pack__btn} ${s.pack__btn_del}` : `${s.pack__btn} ${s.disabled}`;
    const disabledEditBtn = userProfile._id === user_id ? `${s.pack__btn} ${s.pack__btn_edit}` : `${s.pack__btn} ${s.disabled}`;

    return (
        <div className={s.pack}>

            <div className={s.pack__row}>
                <div>{name}</div>
                <div>{cardsCount}</div>
                <div>{created}</div>
            </div>

            <div className={s.pack__interface}>
                <Link className={s.pack__btn} to={`/cards/${_id}`}>Open</Link>
                <button className={disabledEditBtn} onClick={editPackHandler}>Edit</button>
                <button className={disabledDeleteBtn} onClick={() => deletePack(_id)}>Delete</button>
            </div>

        </div>
    )
}