import React, { useState, useEffect } from 'react'
import classes from './UserInfoModal.module.css'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import { updateUserInfo } from '../../../http/userAPI'
import Icons from '../../Icons/Icons'
import { CSSTransition } from 'react-transition-group'
import { fetchRegions, fetchCitiesByRegionId } from '../../../http/locationAPI'
import { setRegions, setCities } from '../../../store/LocationStore'
import { useDispatch, useSelector } from 'react-redux'
import Select from '../../Select/Select'
import ErrorBox from '../../ErrorBox/ErrorBox'

const UserInfoModal = ({setModalIsActive, userInfo, setTooltipIsOpen}) => {
    const [userName, setUserName] = useState(userInfo.name)
    const [userLastName, setUserLastName] = useState(userInfo.lastName)
    const [userBirthday, setUserBirthday] = useState(userInfo.birthday)
    const [userPhoneNumber, setUserPhoneNumber] = useState(userInfo.phoneNumber)
    const [userImageIconIsActive, setUserImageIconIsActive] = useState(false)
    const [region, setRegion] = useState(null)
    const [city, setCity] = useState(userInfo.cityId)
    const [educationalStage, setEducationalStage] = useState(userInfo.educationalStageId)
    const [errorMessage, setErrorMessage] = useState('')
    const [userImageFile, setUserImageFile] = useState()

    const regions = useSelector(state => state.location.regions)
    const cities = useSelector(state => state.location.cities)
    const educationalStages = useSelector(state => state.students._educationalStages)

    const dispatch = useDispatch()

    const userImageIconTransitionClasses = {
        enter: classes['userImageIcon-enter'],
        enterActive: classes['userImageIcon-enter-active'],
        exit: classes['userImageIcon-exit'],
        exitActive: classes['userImageIcon-exit-active'],
    }

    const selectFile = e => {
        setUserImageFile(e.target.files[0])
    }

    const phoneNumberValidation = (userPhoneNumber) => {
        let validatedNumber = userPhoneNumber
        if (userPhoneNumber) {
            validatedNumber = userPhoneNumber.replace(/\D/g, '').replace(/^7/, '8')
        }
        return validatedNumber
    }

    const isPhoneNumberValid = (userPhoneNumber) => {
        if (userPhoneNumber) {
            return userPhoneNumber.length < 12
        } else return true
    }

    const updateUserInformation = async () => {
        try {
            let validatedPhoneNumber = phoneNumberValidation(userPhoneNumber)
            if (isPhoneNumberValid(validatedPhoneNumber)) {
                const formData = new FormData()
                formData.append('id', userInfo.userId);
                formData.append('name', userName)
                formData.append('lastName', userLastName)
                formData.append('birthday', userBirthday)
                formData.append('phone', validatedPhoneNumber)
                formData.append('city', city)
                formData.append('educationalStage', educationalStage)
                formData.append('imgURL', userInfo.img)
                formData.append('img', userImageFile)
                console.log(formData)
                let data = await updateUserInfo(formData)
                setModalIsActive(false)
                setTooltipIsOpen(true)
            } else {
                setErrorMessage('Номер телефона должен содержать не более 11 цифр')
            }
        } catch (e) {
            console.log(e)
            setErrorMessage(e.pesponse.data.message)
        }
    }

    const getRegions = async () => {
        try {
            let {data} = await fetchRegions()
            dispatch(setRegions(data))
            console.log('регионы: ', data)
        } catch (e) {
            console.log(e)
        }
    }
    const getCities = async (regionId) => {
        try {
            let {data} = await fetchCitiesByRegionId(regionId)
            dispatch(setCities(data))
            setCity(null)
            console.log('города: ', data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getRegions()
    }, [])

    useEffect(() => {
        if (region) {
            getCities(region)
        }
    }, [region])

    return (
        <div className={classes.modalWrapper} onClick={(e) => setModalIsActive(false)}>
            <div className={classes.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div className={classes.buttonClose__container} onClick={() => setModalIsActive(false)}>
                    <Icons
                        name='close'
                        color='#000'
                        size='64'
                        className={classes.buttonClose}
                    />
                </div>
                <h4 className={classes.modal_title}>Изменение данных профиля</h4>
                {errorMessage !== '' &&
                    <ErrorBox
                        errorMessage={errorMessage}
                    />
                }
                <div
                    className={classes.userImageContainer}
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
                        alt='Аватар пользователя'
                    />
                    <input
                            // ref={inputFileRef}
                            type='file'
                            onChange={selectFile}
                        />
                </div>
                <div className={classes.modal_userData}>
                    <Input
                        placeholder='Имя...'
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onInput={() => setErrorMessage('')}
                    />
                    <Input
                        placeholder='Фамилия...'
                        type='text'
                        value={userLastName}
                        onChange={(e) => setUserLastName(e.target.value)}
                        onInput={() => setErrorMessage('')}
                    />
                    <Input
                        placeholder='День рождения'
                        type='date'
                        value={userBirthday}
                        onChange={(e) => setUserBirthday(e.target.value)}
                        onInput={() => setErrorMessage('')}
                    />
                    <Input
                        placeholder='Номер телефона'
                        type='phone'
                        value={userPhoneNumber}
                        onChange={(e) => setUserPhoneNumber(e.target.value)}
                        onInput={() => setErrorMessage('')}
                    />
                    <Select dataList={regions} title='Выберите регион' setValue={setRegion}/>
                    <Select dataList={cities} title='Выберите город' setValue={setCity}/>
                    <Select dataList={educationalStages} title='Выберите уровень образования' setValue={setEducationalStage}/>
                </div>
                <Button title='Подтвердить' variant='primary_bg' onClick={(e) => updateUserInformation()}/>
            </div>
        </div>
    )
}

export default UserInfoModal
