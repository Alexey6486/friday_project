import React, {useEffect, useState} from "react";
import './Learn.styles.scss';
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {CardsStateType, getCardsTC, packIdAC} from "../reducers/cardsReducer/cardsReducer";
import {getCardsToLearnTC, GradeStateType, learnTC} from "../reducers/learnReducer/learnReducer";
import {AuthStateType} from "../reducers/authReducers/loginReducer";
import {CardType} from "../api/cardsApi";
import {PacksLoading} from "../utils/loading/packsLoading/PacksLoading";

type CardsPackIdType = {
    cardsPack_id: string
}

type PropsType = RouteComponentProps<CardsPackIdType>;

type CardDataType = {
    _id: string
    question: string
    answer: string
    grade: number
}

const getRandomCard = (arr: Array<CardDataType>) => {

    const newArr: Array<CardDataType> = [];

    arr.forEach(el => {
        let entriesAmount = Math.pow((Math.ceil(6 - el.grade)), 2);
        for (let i = 0; i < entriesAmount; i++) {
            newArr.push(el);
        }
    });

    const cardInx = Math.floor(Math.random() * (newArr.length));

    return newArr[cardInx]
}

const LearnComponent = (props: PropsType) => {

    const dispatch = useDispatch();

    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {isAuth} = authState;

    const gradeState = useSelector<AppRootStateType, GradeStateType>(state => state.gradeReducer);
    const {cards, isGradeLoading, isLearnLoading} = gradeState;

    const {match} = props;

    const cardsPack_id = match.params.cardsPack_id;

    const cardsMap = cards.map(card => {
        const {_id, question, answer} = card;
        const grade: number = +card.grade.toFixed(1);
        return {_id, question, answer, grade}
    });

    const [card, setCard] = useState<CardDataType>({answer: '',question: '',grade: 0,_id: '',});

    const [showAnswer, setShowAnswer] = useState(false);
    const [firstLoading, setFirstLoading] = useState(true);
    const [showGradeBtns, setShowGradeBtns] = useState(true);

    const onClickNext = () => {
        setShowAnswer(false);
        setCard(getRandomCard(cardsMap));
        dispatch(getCardsTC());
        setShowGradeBtns(true);
    }

    const gradeQuestion = (grade: number, card_id: string) => {
        const gradeParam = {grade, card_id}
        dispatch(learnTC(gradeParam));
        setShowGradeBtns(false);
    }

    useEffect(() => {
        if (firstLoading) {
            dispatch(getCardsToLearnTC(cardsPack_id))
            setFirstLoading(false)
        }
        if (cards.length > 0)  setCard(getRandomCard(cardsMap));
    }, [dispatch, cards, cardsPack_id])

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    const disableBtn = isGradeLoading ? 'gradeBtn disabled' : 'gradeBtn';
    const loading = isLearnLoading && <PacksLoading/>;

    return (

        <div className={'learn'}>
            {loading ? loading :
                <div className={'container'}>

                    <div className={'question'}>
                        <div className={'question__title'}>Question:</div>
                        <div className={'question__text'}>{card.question}</div>
                        <div className={'question__grade'}>Current grade: {card.grade}</div>
                        {!showAnswer && <button onClick={() => setShowAnswer(true)}>show answer</button>}
                    </div>

                    {
                        showAnswer &&
                        <div className={'answer'}>
                            <div className={'answer__title'}>Answer:</div>
                            <div className={'answer__text'}>{card.answer}</div>
                            <div className={'answer__btnWrap'}>
                                {
                                    showGradeBtns &&
                                    <div className={'answer__btnBlock'}>
                                        <button className={disableBtn} onClick={() => {
                                            gradeQuestion(1, card._id)
                                        }}>wrong
                                        </button>
                                        <button className={disableBtn} onClick={() => {
                                            gradeQuestion(2, card._id)
                                        }}>bad
                                        </button>
                                        <button className={disableBtn} onClick={() => {
                                            gradeQuestion(3, card._id)
                                        }}>close
                                        </button>
                                        <button className={disableBtn} onClick={() => {
                                            gradeQuestion(4, card._id)
                                        }}>almost
                                        </button>
                                        <button className={disableBtn} onClick={() => {
                                            gradeQuestion(5, card._id)
                                        }}>correct
                                        </button>
                                    </div>
                                }
                            </div>
                            <button className={`${disableBtn} nextBtn`} onClick={onClickNext}>next</button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export const Learn = withRouter(LearnComponent);