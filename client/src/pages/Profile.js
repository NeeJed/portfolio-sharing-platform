import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfileData } from '../http/userAPI';
import { setUserInfo, setUserCertificates } from '../store/UserStore';
import LoadingSpin from '../components/LoadingSpin/LoadingSpin';
import { fetchCertificatesByUserId } from '../http/certificateAPI';
import CreateCertificate from '../components/CreateCertificate/CreateCertificate';
import classes from '../styles/Profile.module.css'
import Button from '../components/Button/Button';
import DescriptionLine from '../components/DescriptionLine/DescriptionLine';
import DescriptionLineEditable from '../components/DescriptionLineEditable/DescriptionLineEditable';

const Profile = () => {
    let user = useSelector(state => state.user._user)
    let userInfo = useSelector(state => state.user._userInfo)
    let userCertificates = useSelector(state => state.user._userCertificates)
    const dispatch = useDispatch();
    const userDataIsLoading = useRef(true)
    const userCertificatesIsLoading = useRef(true)

    const getUserInfo = async () => {
        try {
            let data = await getUserProfileData(user.id)
            console.log(data);
            dispatch(setUserInfo(data))
        } catch (e) {
            console.log(e)
        } finally {
            userDataIsLoading.current = false
        }
    }
    
    const getUserCertificates = async () => {
        try {
            let {data} = await fetchCertificatesByUserId(user.id)
            console.log(data);
            dispatch(setUserCertificates(data))
        } catch (e) {
            console.log(e)
        } finally {
            userCertificatesIsLoading.current = false
        }
    }

    useEffect(() => {
        getUserInfo();
        getUserCertificates();
    }, [])

    if (userDataIsLoading.current) {
        return <LoadingSpin type='component'/>
    }

    return (
        <div className={classes.userProfile}>
            <div className={classes.userProfile_container}>
                <div className={classes.profileData}>
                    <div className={classes.profileData_image}>
                        <img
                            src={`${process.env.REACT_APP_API_URL}/${userInfo.img}`}
                            className={classes.userImage}
                        />
                    </div>
                    <div className={classes.profileData_info}>
                        <DescriptionLine descriptionName='ID пользователя' descriptionData={user.id}/>
                        <DescriptionLine descriptionName='Почта регистрации' descriptionData={user.email}/>
                        <DescriptionLineEditable
                            descriptionName='Имя пользователя'
                            descriptionData={userInfo.name}
                            edit={<Button title='Изменить' variant='contrast'/>}
                        />
                        <DescriptionLineEditable
                            descriptionName='Доступ к просмотру профиля'
                            descriptionData={userInfo.sharingAccess
                                ?   'Доступно'
                                :   'Запрещено'}
                            edit={<Button title='Изменить' variant='contrast'/>}
                        />
                    </div>
                </div>
                <CreateCertificate/>
                <div className={classes.profileCertificates}>
                    {userCertificates.rows
                    ?
                        userCertificates.rows.map(certificate =>
                            <div className={classes.certificate}>
                                <div key={certificate.id}>
                                    {certificate.name}
                                </div>
                                <img
                                    src={process.env.REACT_APP_API_URL + `/` + certificate.img}
                                    className={classes.certificate_img}
                                />
                            </div> 
                        )
                    :
                    <div>Нет достижений</div>}
                </div>
            </div>
        </div>
    )
}

export default Profile;