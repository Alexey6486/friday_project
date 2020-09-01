import React, {useEffect} from "react";
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

    const {match, history, location} = props;

    const cardsPack_id = match.params.cardsPack_id;

    useEffect(() => {
        const page = fromServer.page;
        const pageCount = fromServer.pageCount;
        dispatch(getCardsTC({cardsPack_id, page, pageCount}))
    }, [])

    const sortArray = ['cardAnswer', 'cardQuestion'];
    const sortMap = sortArray.map((sort, idx) => <Sorting key={idx} sortDirection={sort} sortRegular={() => {}}/>);

    const checkIfPackIsYours = packsState.fromServer.cardPacks.filter(f => {
        if (f._id === cardsPack_id && f.user_id === userProfile._id) {
            return f
        }
    });


    const cardsMap = fromServer.cards.map(card => {

        const {_id, question, answer, created} = card;

        return (
            <Card key={_id} question={question} answer={answer} created={created} checkIfPackIsYours={checkIfPackIsYours.length}/>
        )
    })

    return (
        <div className={s.cards}>
            <div className={'container'}>

                <div className={s.cards__interface}>

                    <button className={s.cards__btn}>add new card</button>

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

                    {cardsMap}

                </div>

                <Pagination currentPage={fromServer.page} itemsOnPage={fromServer.pageCount} onPageChange={() => {}}
                            pagesInPortion={5} totalItems={fromServer.cardsTotalCount}
                            onShowByChange={() => {}} onPortionChange={() => {}}
                            currentPortion={currentPortion} setPortionChange={() => {}}/>

            </div>
        </div>
    )
}

export const Cards = withRouter(CardsComponent);