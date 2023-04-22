import React, { useState } from 'react';
import classes from '../styles/Auth.module.css';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE, AUTH_ROUTE, SEARCH_ROUTE } from '../utils/consts';
import { registration, login, getUserProfileData } from '../http/userAPI';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setIsAuth, setUserInfo } from '../store/UserStore';
import ErrorBox from '../components/ErrorBox/ErrorBox';

const Auth = () => {
    const user = useSelector(state => state.user._user)
    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === AUTH_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                console.log(data);
            } else {
                data = await registration(email, password);
                console.log(data)
            }
            dispatch(setUser(data))
            dispatch(setIsAuth(true))
            setErrorMessage('')
            navigate(SEARCH_ROUTE)
        } catch (e) {
            setErrorMessage(e.response.data.message)
        }
    }

    return (
        <div
            className={classes.container}
            style={{height: window.innerHeight - 50}}
        >
            <div className={classes.formContainer}>
                <h3 className={classes.title}>{isLogin ? 'Авторизация' : 'Регистрация'}</h3>
                <form className={classes.form}>
                    {
                        errorMessage !== ''
                        ?
                        <ErrorBox
                            errorMessage={errorMessage}
                        />
                        :
                        <div></div>
                    }
                    <Input
                        type="email"
                        placeholder='Введите ваш email...'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onInput={() => setErrorMessage('')}
                    />
                    <Input
                        type="password"
                        placeholder='Введите ваш пароль...'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onInput={() => setErrorMessage('')}
                    />
                    <div className={classes.form_bottom}>
                        <Button
                            type="button"
                            title={isLogin ? 'Войти' : 'Зарегистрироваться'}
                            onClick={click}
                        />
                        {isLogin
                        ?
                            <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} className={classes.redirectLink}>Зарегистрируйтесь</NavLink> </div>
                        :
                            <div>Есть аккаунт? <NavLink to={AUTH_ROUTE} className={classes.redirectLink}>Войдите</NavLink> </div>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth;