import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfileData, updateUserShareAccess } from '../http/userAPI';
import { setUserInfo, setUserCertificates } from '../store/UserStore';
import LoadingSpin from '../components/LoadingSpin/LoadingSpin';
import { fetchCertificatesByUserId } from '../http/certificateAPI';
import CreateCertificate from '../components/CreateCertificate/CreateCertificate';
import classes from '../styles/Profile.module.css'
import Button from '../components/Button/Button';
import DescriptionLine from '../components/DescriptionLine/DescriptionLine';
import DescriptionLineEditable from '../components/DescriptionLineEditable/DescriptionLineEditable';
import Select from '../components/Select/Select';
import UserInfoModal from '../components/modals/UserInfoModal/UserInfoModal';
import Tooltip from '../components/Tooltip/Tooltip';

const Profile = () => {
    let user = useSelector(state => state.user._user)
    let userInfo = useSelector(state => state.user._userInfo)
    let userCertificates = useSelector(state => state.user._userCertificates)
    const dispatch = useDispatch();
    const userDataIsLoading = useRef(true)
    const userCertificatesIsLoading = useRef(true)
    const [userInfoModalIsActive, setUserInfoModalIsActive] = useState(false)
    const [changeUserInfoTooltipIsActive, setChangeUserInfoTooltipIsActive] = useState(false)
    const [changeUserAccessTooltipIsActive, setChangeUserAccessTooltipIsActive] = useState(false)

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

    const updateShareAccess = async () => {
        try {
            let data = await updateUserShareAccess(user.id, userInfo.shareAccess)
        } catch (e) {
            console.log(e)
        } finally {
            setChangeUserAccessTooltipIsActive(true)
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
            <Tooltip
                text='Изменение данных прошло успешно'
                node={document.body}
                tooltipIsActive={changeUserInfoTooltipIsActive}
                setTooltipIsActive={setChangeUserInfoTooltipIsActive}
            />
            <Tooltip
                text='Доступ к профилю успешно изменён'
                node={document.body}
                tooltipIsActive={changeUserAccessTooltipIsActive}
                setTooltipIsActive={setChangeUserAccessTooltipIsActive}
            />
            {userInfoModalIsActive &&
                <UserInfoModal
                    setModalIsActive={setUserInfoModalIsActive}
                    userInfo={userInfo}
                    setTooltipIsOpen={setChangeUserInfoTooltipIsActive}
                />
            }
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
                        <DescriptionLine descriptionName='Имя' descriptionData={userInfo.name}/>
                        <DescriptionLine descriptionName='Фамилия' descriptionData={userInfo.lastName}/>
                        <DescriptionLine descriptionName='Дата рождения' descriptionData={userInfo.birthday}/>
                        <DescriptionLine descriptionName='Контактный телефон' descriptionData={userInfo.phoneNumber}/>
                        <DescriptionLineEditable
                            descriptionName='Доступ к просмотру профиля'
                            descriptionData={userInfo.shareAccess
                                ?   'Доступно'
                                :   'Запрещено'}
                        >
                            <Button title={userInfo.shareAccess ? 'Запретить доступ' : 'Разрешить доступ'} variant='contrast' onClick={(e) => updateShareAccess()}/>
                        </DescriptionLineEditable>
                        <Button style={{width: 250}} title='Изменить данные профиля' variant='primary_bg' onClick={(e) => setUserInfoModalIsActive(true)}/>
                    </div>
                </div>
                <CreateCertificate/>
                <div className={classes.profileCertificates}>
                    {userCertificates.rows
                    ?
                        userCertificates.rows.map(certificate =>
                            <div key={certificate.id} className={classes.certificate}>
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