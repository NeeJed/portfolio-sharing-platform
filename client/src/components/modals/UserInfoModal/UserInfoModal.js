import React, { useState } from 'react'
import classes from './UserInfoModal.module.css'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import { updateUserInfo } from '../../../http/userAPI'

const UserInfoModal = ({setModalIsActive, userInfo}) => {
    const [userName, setUserName] = useState(userInfo.name)
    const [userLastName, setUserLastName] = useState(userInfo.lastName)
    const [userBirthday, setUserBirthday] = useState(userInfo.birthday)
    const [userPhoneNumber, setUserPhoneNumber] = useState(userInfo.phoneNumber)

    const updateUserInformation = async () => {
        try {
            console.log(userInfo.userId, userName, userLastName, userBirthday, userPhoneNumber)
            let data = await updateUserInfo(userInfo.userId, userName, userLastName, userBirthday, userPhoneNumber)
        } catch (e) {
            console.log(e)
        } finally {
            setModalIsActive(false)
        }
    }

    return (
        <div className={classes.modalWrapper} onClick={(e) => setModalIsActive(false)}>
            <div className={classes.modalContainer} onClick={(e) => e.stopPropagation()}>
                <h4 className={classes.modal_title}>Изменение данных профиля</h4>
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
