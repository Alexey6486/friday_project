import React, {useEffect} from "react";
import s from './Profile.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {authMeTC, AuthStateType} from "../../reducers/authReducers/loginReducer";
import {Redirect} from "react-router-dom";
import dummy_img from '../../assets/img/user.png';

export const Profile = () => {

    const dispatch = useDispatch();
    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {isAuth, userProfile} = authState;

    useEffect(() => {
        dispatch(authMeTC());
    }, [dispatch])

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    //const expirationDate = new Date(userProfile.tokenDeathTime).toLocaleString();

    return (
        <div className={s.profileBlock}>
            <div className={'container'}>
                <div className={s.profileContent}>
                    <div className={s.profileContent__left}>
                        <div className={s.profileContent__ava}>
                            {
                                userProfile.avatar
                                    ? <img src={userProfile.avatar} alt={'user ava'}/>
                                    : <img src={dummy_img} alt={'user ava'}/>
                            }
                        </div>
                    </div>
                    <div className={s.profileContent__right}>
                        <div className={s.profileContent__userData}>
                            Name: {userProfile.name}
                        </div>
                        <div className={s.profileContent__userData}>
                            User id: {userProfile._id}
                        </div>
                        <div className={s.profileContent__userData}>
                            Email: {userProfile.email}
                        </div>
                        <div className={s.profileContent__userData}>
                            Created: {userProfile.created}
                        </div>
                        <div className={s.profileContent__userData}>
                            Admin: {userProfile.isAdmin ? 'yes' : 'no'}
                        </div>
                        <div className={s.profileContent__userData}>
                            Cards pack: {userProfile.publicCardPacksCount}
                        </div>
                        <div className={s.profileContent__userData}>
                            Remember login: {userProfile.rememberMe ? 'yes' : 'no'}
                        </div>
                        <div className={s.profileContent__userData}>
                            Updated: {userProfile.updated}
                        </div>
                        <div className={s.profileContent__userData}>
                            Verified: {userProfile.verified ? 'yes' : 'no'}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}