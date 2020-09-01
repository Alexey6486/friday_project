import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import s from './Cards.module.scss';
import {AppRootStateType} from "../store/store";
import {CardsStateType, getCardsTC} from "../reducers/cardsReducer/cardsReducer";
import {Search} from "../utils/search/Search";
import {Sorting} from "../utils/sorting/Sorting";
import {Card} from "./card/Card";
import {Pagination} from "../utils/pagination/Pagination";
import {PackStateType} from "../reducers/packsReducer/packsReducer";
import {AuthStateType} from "../reducers/authReducers/loginReducer";
import {AddCard} from "./addCard/AddCard";
import {PacksLoading} from "../utils/loading/packsLoading/PacksLoading";
import {EditCard} from "./editCard/EditCard";

type CardsPackIdType = {
    cardsPack_id: string
}
type PropsType = RouteComponentProps<CardsPackIdType>;

const CardsComponent = (props: PropsType) => {

    const dispatch = useDispatch();

    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {userProfile} = authState;

    const cardsState = useSelector<AppRootStateType, CardsStateType>(state => state.cardsReducer);
    const {fromServer, currentPortion, isLoading, sortBy, sortParam} = cardsState;

    const packsState = useSelector<AppRootStateType, PackStateType>(state => state.packsReducer);

    const {match} = props;

    const cardsPack_id = match.params.cardsPack_id;

    const [createPackPopUp, setCreatePackPopUp] = useState(false);
    const [editPackPopUp, setEditPackPopUp] = useState('');

    const toggleCreatePackPopUp = useCallback(() => {
        setCreatePackPopUp(prev => !prev);
    }, []);
    const toggleEditPackPopUp = useCallback((_id: string) => {
        setEditPackPopUp(_id);
    }, []);

    useEffect(() => {
        const page = fromServer.page;
        const pageCount = fromServer.pageCount;
        dispatch(getCardsTC({cardsPack_id, page, pageCount}))
    }, [])

    const sortArray = ['cardAnswer', 'cardQuestion'];
    const sortMap = sortArray.map((sort, idx) => <Sorting key={idx} sortDirection={sort} sortRegular={() => {
    }}/>);

    const checkIfPackIsYours = packsState.fromServer.cardPacks.filter(f => {
        if (f._id === cardsPack_id && f.user_id === userProfile._id) {
            return f
        }
    });

    const cardsMap = fromServer.cards.map(card => {

        const {_id, question, answer, created} = card;

        return (
            <Card key={_id} question={question} answer={answer} created={created}
                  checkIfPackIsYours={checkIfPackIsYours.length} toggleEditPackPopUp={toggleEditPackPopUp} id={_id}
                  cardsPack_id={cardsPack_id}/>
        )
    })

    const isPackEmpty = cardsMap.length < 1 ? <div>There are no cards yet here.</div> : cardsMap;

    return (
        <div className={s.cards}>
            <div className={'container'}>

                <div className={s.cards__interface}>

                    <button className={s.cards__btn} onClick={toggleCreatePackPopUp}>add new card</button>

                    <Search/>

                    <div className={s.cards__sortBlock}>
                        <div className={s.cards__sortTitle}>Sort by:</div>
                        <div className={s.cards__sortBtns}>{sortMap}</div>
                    </div>

                </div>

                <div className={s.cardsTable}>

                    <div className={s.cardsTable__header}>
                        <div>Card question</div>
                        <div>Card answer</div>
                        <div>Created</div>
                    </div>


                    {isLoading ? <PacksLoading/> : isPackEmpty}

                </div>

                <Pagination currentPage={fromServer.page} itemsOnPage={fromServer.pageCount} onPageChange={() => {
                }}
                            pagesInPortion={5} totalItems={fromServer.cardsTotalCount}
                            onShowByChange={() => {
                            }} onPortionChange={() => {
                }}
                            currentPortion={currentPortion} setPortionChange={() => {
                }}/>

            </div>

            {
                createPackPopUp &&
                <AddCard toggleCreatePackPopUp={toggleCreatePackPopUp} cardsPack_id={cardsPack_id}/>
            }
            {
                editPackPopUp &&
                <EditCard toggleEditPackPopUp={toggleEditPackPopUp} id={editPackPopUp} cardsPack_id={cardsPack_id}/>
            }

        </div>
    )
}

export const Cards = withRouter(CardsComponent);