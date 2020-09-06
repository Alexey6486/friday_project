import React from "react";
import './DeletePack.styles.scss';

type PropsType = {
    toggleDeletePackPopUp: (id: string) => void
    deletePack: (id: string) => void
    id: string
}

export const DeletePack = (props: PropsType) => {

    const {toggleDeletePackPopUp, deletePack, id} = props;

    const onClose = () => {
        toggleDeletePackPopUp('')
    }

    const onConfirm = () => {
        deletePack(id);
        toggleDeletePackPopUp('');
    }

    return (
        <div className={'deletePack'}>
            <div className={'deletePack__wrap'}>
                <div className={'close'} onClick={onClose}></div>
                <div className={'deletePack__wrap-title'}>Delete the pack?</div>
                <div className={'deletePack__wrap-btns'}>
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    )
}