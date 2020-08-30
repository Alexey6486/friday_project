import React from "react";
import s from './Pack.module.scss';
import {CardInPackType} from "../../api/packsApi";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {deletePackTC, PackStateType} from "../../reducers/packsReducer/packsReducer";
import {AuthStateType} from "../../reducers/authReducers/loginReducer";

type PropsType = CardInPackType;

export const Pack = (props: PropsType) => {

    const dispatch = useDispatch();
    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);
    const {fromServer} = packsState;

    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {userProfile} = authState;

    const {name, cardsCount, created, _id, user_id} = props;

    const deletePack = (id: string) => {
        dispatch(deletePackTC({page: fromServer.page, pageCount: fromServer.pageCount}, id))
    }

    const disabledDeleteBtn = userProfile._id === user_id ? `${s.pack__btn} ${s.pack__btn_del}` : `${s.pack__btn} ${s.disabled}`;

    return (
        <div className={s.pack}>

            <div className={s.pack__row}>
                <div>{name}</div>
                <div>{cardsCount}</div>
                <div>{created}</div>
            </div>

            <div className={s.pack__interface}>
                <button className={s.pack__btn}>Open</button>
                <button className={`${s.pack__btn} ${s.pack__btn_edit}`}>Edit</button>
                <button className={disabledDeleteBtn} onClick={() => deletePack(_id)}>Delete</button>
            </div>

        </div>
    )
}