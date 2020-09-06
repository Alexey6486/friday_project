import React from "react";
import './DeleteCard.styles.scss';

type PropsType = {
    toggleDeleteCardPopUp: (id: string, cardsPack_id: string) => void
    deleteCard: (id: string, cardsPack_id: string) => void
    id: string
    cardsPackId: string
}

export const DeleteCard = (props: PropsType) => {

    const {toggleDeleteCardPopUp, deleteCard, id, cardsPackId} = props;

    const onClose = () => {
        toggleDeleteCardPopUp('', '')
    }

    const onConfirm = () => {
        deleteCard(id, cardsPackId);
        toggleDeleteCardPopUp('', '');
    }

    return (
        <div className={'deleteCard'}>
            <div className={'deleteCard__wrap'}>
                <div className={'close'} onClick={onClose}></div>
                <div className={'deleteCard__wrap-title'}>Delete the card?</div>
                <div className={'deleteCard__wrap-btns'}>
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    )
}