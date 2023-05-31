import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfileData, updateUserShareAccess } from '../http/userAPI';
import { setUserInfo, setUserCertificates } from '../store/UserStore';
import LoadingSpin from '../components/LoadingSpin/LoadingSpin';
import { fetchCertificatesByUserId } from '../http/certificateAPI';
import CreateCertificate from '../components/CreateCertificate/CreateCertificate';
import classes from '../styles/UserPage.module.css'
import Button from '../components/Button/Button';
import DescriptionLine from '../components/DescriptionLine/DescriptionLine';
import DescriptionLineEditable from '../components/DescriptionLineEditable/DescriptionLineEditable';
import Select from '../components/Select/Select';
import UserInfoModal from '../components/modals/UserInfoModal/UserInfoModal';
import Tooltip from '../components/Tooltip/Tooltip';
import UserCertificate from '../components/UserCertificate/UserCertificate';
import Icons from '../components/Icons/Icons';
import Portal from '../components/Portal/Portal';
import { CSSTransition } from 'react-transition-group';
import screenSizes, { SCREEN_WIDTH_4 } from '../utils/screenSizes';

const UserPage = () => {
    const [userInfo, setUserInfo] = useState({})
    const [userCertificates, setUserCertificates] = useState()
    const {id} = useParams()
    const isLoading = useRef(true)
    const userCertificatesIsLoading = useRef(true)

    const getUserInfo = async () => {
        try {
            let data = await getUserProfileData(id)
            console.log(data)
            setUserInfo(data)
        } catch (e) {
            console.log(e)
        } finally {
            isLoading.current = false
        }
    }

    const getUserCertificates = async () => {
        try {
            let {data} = await fetchCertificatesByUserId(id)
            console.log(data.rows);
            setUserCertificates(data.rows)
        } catch (e) {
            console.log(e)
        } finally {
            userCertificatesIsLoading.current = false
        }
    }

    useEffect( () => {
        getUserInfo()
        getUserCertificates()
    }, [])
    return (
        <div className={classes.userProfile}>
            <div className={classes.userProfile_container}>
                {!isLoading.current
                ?
                    <div className={classes.profileData}>
                        <div
                            className={classes.profileData_image}
                        >
                            <img
                                src={`${process.env.REACT_APP_API_URL}/${userInfo.img}`}
                                className={classes.userImage}
                            />
                        </div>
                        <div className={classes.profileData_info}>
                            <DescriptionLine descriptionName='Имя' descriptionData={userInfo.name} className={classes.profileItem}/>
                            <DescriptionLine descriptionName='Фамилия' descriptionData={userInfo.lastName} className={classes.profileItem}/>
                            <DescriptionLine descriptionName='Дата рождения' descriptionData={userInfo.birthday} className={classes.profileItem}/>
                            <DescriptionLine descriptionName='Контактный телефон' descriptionData={userInfo.phoneNumber} className={classes.profileItem}/>
                        </div>
                    </div>
                :
                    <LoadingSpin type='component'/>
                }
                <div className={classes.profileCertificates}>
                    {!userCertificatesIsLoading.current
                    ?
                        userCertificates
                        ?
                            userCertificates.map(certificate =>
                                <UserCertificate key={certificate.id} certificate={certificate}/>
                            )
                        :
                            <div>Нет достижений</div>
                    :
                        <LoadingSpin type='component'/>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserPage;