import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfileData } from '../http/userAPI';
import { setUserInfo } from '../store/UserStore';
import LoadingSpin from '../components/LoadingSpin/LoadingSpin';

const Profile = () => {
    let user = useSelector(state => state.user._user)
    let userInfo = useSelector(state => state.user._userInfo)
    const dispatch = useDispatch();
    const [userDataIsLoading, setUserDataIsLoading] = useState(true)

    const getUserInfo = async () => {
        try {
            let data = await getUserProfileData(user.id)
            console.log(data);
            dispatch(setUserInfo(data))
        } catch (e) {
            console.log(e)
        } finally {
            setUserDataIsLoading(false)
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    if (userDataIsLoading) {
        return <LoadingSpin type='component'/>
    }

    return (
        <div>
            <img src={`${process.env.REACT_APP_API_URL}/${userInfo.img}`}/>
            <div>id: {user.id}</div>
            <div>email: {user.email}</div>
            <div>name: {userInfo.name}</div>
            <div>Доступ к просмотру профиля: </div>
        </div>
    )
}

export default Profile;