import React from 'react';
import classes from '../styles/Auth.module.css';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { NavLink, useLocation } from 'react-router-dom';
import { REGISTRATION_ROUTE, AUTH_ROUTE } from '../utils/consts';

const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname === AUTH_ROUTE;
    return (
        <div
            className={classes.container}
            style={{height: window.innerHeight - 50}}
        >
            <div className={classes.formContainer}>
                <h3 className={classes.title}>{isLogin ? 'Авторизация' : 'Регистрация'}</h3>
                <form className={classes.form}>
                    <Input type={"email"} placeholder={'Введите ваш email...'}/>
                    <Input type={"password"} placeholder={'Введите ваш пароль...'}/>
                    <div className={classes.form_bottom}>
                        <Button type={"submit"} title={isLogin ? 'Войти' : 'Зарегистрироваться'}/>
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