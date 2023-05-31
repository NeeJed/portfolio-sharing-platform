import React, { useState } from 'react'
import classes from './UserInfoModal.module.css'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import { updateUserInfo } from '../../../http/userAPI'
import Icons from '../../Icons/Icons'
import { CSSTransition } from 'react-transition-group'

const UserInfoModal = ({setModalIsActive, userInfo, setTooltipIsOpen}) => {
    const [userName, setUserName] = useState(userInfo.name)
    const [userLastName, setUserLastName] = useState(userInfo.lastName)
    const [userBirthday, setUserBirthday] = useState(userInfo.birthday)
    const [userPhoneNumber, setUserPhoneNumber] = useState(userInfo.phoneNumber)
    const [userImageIconIsActive, setUserImageIconIsActive] = useState(false)

    const userImageIconTransitionClasses = {
        enter: classes['userImageIcon-enter'],
        enterActive: classes['userImageIcon-enter-active'],
        exit: classes['userImageIcon-exit'],
        exitActive: classes['userImageIcon-exit-active'],
    }

    const updateUserInformation = async () => {
        try {
            console.log(userInfo.userId, userName, userLastName, userBirthday, userPhoneNumber)
            let data = await updateUserInfo(userInfo.userId, userName, userLastName, userBirthday, userPhoneNumber)
        } catch (e) {
            console.log(e)
        } finally {
            setModalIsActive(false)
            setTooltipIsOpen(true)
        }
    }

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
                    />
                </div>
                <div className={classes.modal_userData}>
                    <Input
                        placeholder='Имя...'
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <Input
                        placeholder='Фамилия...'
                        type='text'
                        value={userLastName}
                        onChange={(e) => setUserLastName(e.target.value)}
                    />
                    <Input
                        placeholder='День рождения'
                        type='date'
                        value={userBirthday}
                        onChange={(e) => setUserBirthday(e.target.value)}
                    />
                    <Input
                        placeholder='Номер телефона'
                        type='phone'
                        value={userPhoneNumber}
                        onChange={(e) => setUserPhoneNumber(e.target.value)}
                    />
                    
                </div>
                <Button title='Подтвердить' variant='primary_bg' onClick={(e) => updateUserInformation()}/>
            </div>
        </div>
    )
}

export default UserInfoModal
