import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfileData, updateUserShareAccess, getOneEducationalStage } from '../http/userAPI';
import { setUserInfo, setUserCertificates, setUserCity, setUserRegion, setUserEducationalStage } from '../store/UserStore';
import LoadingSpin from '../components/LoadingSpin/LoadingSpin';
import { fetchCertificatesByUserId, fetchTypes, fetchCategories, fetchRanks } from '../http/certificateAPI';
import CreateCertificate from '../components/CreateCertificate/CreateCertificate';
import classes from '../styles/Profile.module.css'
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
import { SCREEN_WIDTH_4, SCREEN_WIDTH_3 } from '../utils/constBreakpoints';
import { setCategories, setTypes, setRanks } from '../store/CertificateStore';
import { fetchOneCity } from '../http/locationAPI';

const Profile = () => {
    let user = useSelector(state => state.user._user)
    let userInfo = useSelector(state => state.user._userInfo)
    let userCertificates = useSelector(state => state.user._userCertificates)
    let userCity = useSelector(state => state.user._userCity)
    const educationalStages = useSelector(state => state.students._educationalStages)
    const dispatch = useDispatch();
    const userDataIsLoading = useRef(true)
    const userCertificatesIsLoading = useRef(true)
    const [userInfoModalIsActive, setUserInfoModalIsActive] = useState(false)
    const [userEducationalStageName, setUserEducationalStageName] = useState('')
    const [changeUserInfoTooltipIsActive, setChangeUserInfoTooltipIsActive] = useState(false)
    const [changeUserAccessTooltipIsActive, setChangeUserAccessTooltipIsActive] = useState(false)
    const [addCertificateTooltipIsActive, setAddCertificateTooltipIsActive] = useState(false)
    const [userImageIconIsActive, setUserImageIconIsActive] = useState(false)
    const [createCertificateModalIsActive, setCreateCertificateModalIsActive] = useState(false)

    const categories = useSelector(state => state.certificate._categories)
    const types = useSelector(state => state.certificate._types)
    const ranks = useSelector(state => state.certificate._ranks)

    const userImageIconTransitionClasses = {
        enter: classes['userImageIcon-enter'],
        enterActive: classes['userImageIcon-enter-active'],
        exit: classes['userImageIcon-exit'],
        exitActive: classes['userImageIcon-exit-active'],
    }

    const getCategories = async () => {
        try {
            let {data} = await fetchCategories()
            dispatch(setCategories(data))
        } catch (e) {
            console.log(e)
        }
    }
    const getTypes = async () => {
        try {
            let {data} = await fetchTypes()
            dispatch(setTypes(data))
        } catch (e) {
            console.log(e)
        }
    }
    const getRanks = async () => {
        try {
            let {data} = await fetchRanks()
            dispatch(setRanks(data))
        } catch (e) {
            console.log(e)
        }
    }

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
    const getUserCity = async () => {
        try {
            let data = await fetchOneCity(userInfo.cityId)
            console.log(data.name)
            dispatch(setUserCity(data.name))
        } catch (e) {
            console.log(e)
        }
    }
    const getUserEducationalStageName = () => {
        let userEducationalStage = educationalStages.filter((stage) => stage.id === userInfo.educationalStageId)
        if (userEducationalStage.length) {
            setUserEducationalStageName(userEducationalStage[0].name)
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
        getUserCertificates();
        if (!categories.length) {
            getCategories()
        }
        if (!types.length) {
            getTypes()
        }
        if (!ranks.length) {
            getRanks()
        }
    }, [])

    useEffect(() => {
        getUserCity()
    }, [userInfo.cityId])
    useEffect(() => {
        if (!userInfo) {
            getUserInfo();
        }
    }, [userInfo])
    useEffect(() => {
        getUserEducationalStageName()
    }, [userInfo.educationalStageId])

    if (!userInfo && userDataIsLoading.current) {
        return <LoadingSpin type='component'/>
    }

    return (
        <div className={classes.userProfile} style={{minHeight: window.innerHeight - 50}}>
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
            <Tooltip
                text='Сертификат успешно добавлен'
                node={document.body}
                tooltipIsActive={addCertificateTooltipIsActive}
                setTooltipIsActive={setAddCertificateTooltipIsActive}
            />
            {userInfoModalIsActive &&
                <Portal>
                    <UserInfoModal
                        setModalIsActive={setUserInfoModalIsActive}
                        userInfo={userInfo}
                        setTooltipIsOpen={setChangeUserInfoTooltipIsActive}
                    />
                </Portal>
            }
            <div className={classes.userProfile_container}>
                <div className={classes.profileData}>
                    <div
                        className={classes.profileData_image}
                        onClick={(e) => setUserInfoModalIsActive(true)}
                        onMouseOver={() => setUserImageIconIsActive(true)}
                        onMouseLeave={() => setUserImageIconIsActive(false)}
                    >
                        <CSSTransition in={userImageIconIsActive} timeout={300} classNames={userImageIconTransitionClasses} unmountOnExit>
                            <div className={classes.userImage__iconWrapper}>
                                <Icons
                                    name='photo'
                                    color='#000'
                                    size='64'
                                    className={classes.userImage__icon}
                                />
                            </div>
                        </CSSTransition>
                        <img
                            src={`${process.env.REACT_APP_API_URL}/${userInfo.img}`}
                            className={classes.userImage}
                        />
                    </div>
                    <div className={classes.profileData_info}>
                        <DescriptionLine descriptionName='ID пользователя' descriptionData={user.id} className={classes.profileItem}/>
                        <DescriptionLine descriptionName='Почта регистрации' descriptionData={user.email} className={classes.profileItem}/>
                        <DescriptionLine descriptionName='Имя' descriptionData={userInfo.name} className={classes.profileItem}/>
                        <DescriptionLine descriptionName='Фамилия' descriptionData={userInfo.lastName} className={classes.profileItem}/>
                        <DescriptionLine descriptionName='Дата рождения' descriptionData={userInfo.birthday} className={classes.profileItem}/>
                        <DescriptionLine descriptionName='Город' descriptionData={userCity} className={classes.profileItem}/>
                        <DescriptionLine descriptionName='Уровень образования' descriptionData={userEducationalStageName} className={classes.profileItem}/>
                        <DescriptionLine descriptionName='Контактный телефон' descriptionData={userInfo.phoneNumber} className={classes.profileItem}/>
                        <DescriptionLineEditable
                            descriptionName='Доступ к просмотру профиля'
                            descriptionData={userInfo.shareAccess
                                ?   'Доступно'
                                :   'Запрещено'}
                            className={classes.profileItem}
                        >
                            <Button title={userInfo.shareAccess ? 'Запретить' : 'Разрешить'} variant='contrast' onClick={(e) => updateShareAccess()}/>
                        </DescriptionLineEditable>
                        <div className={classes.profileData_info__buttons}>
                            <Button
                                title={window.innerWidth > SCREEN_WIDTH_3 ? 'Изменить данные профиля' : 'Изменить'}
                                variant='primary_bg'
                                onClick={(e) => setUserInfoModalIsActive(true)}>
                                <Icons
                                    name='edit'
                                    color='#fff'
                                    size='32'
                                    className={classes.buttonEdit}
                                />
                            </Button>
                            <Button
                                title={window.innerWidth > SCREEN_WIDTH_3 ? 'Добавить новый сертификат' : 'Добавить'}
                                variant='primary_bg'
                                onClick={(e) => setCreateCertificateModalIsActive(true)}
                            >
                                <Icons
                                    name='document'
                                    color='#fff'
                                    size='32'
                                    className={classes.buttonEdit}
                                />
                            </Button>
                        </div>
                    </div>
                </div>
                {createCertificateModalIsActive &&
                    <Portal>
                        <CreateCertificate setModalIsActive={setCreateCertificateModalIsActive} setTooltipIsOpen={setAddCertificateTooltipIsActive}/>
                    </Portal>
                }
                <div className={classes.profileCertificates}>
                    {userCertificates.rows
                    ?
                        userCertificates.rows.map(certificate =>
                            <UserCertificate key={certificate.id} certificate={certificate}/>
                        )
                    :
                    <div>Нет достижений</div>}
                </div>
            </div>
        </div>
    )
}

export default Profile;