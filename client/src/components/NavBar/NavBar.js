import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classes from './NavBar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { START_ROUTE, SEARCH_ROUTE, PROFILE_ROUTE, AUTH_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import { setIsAuth, setUser } from '../../store/UserStore';

const NavBar = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [userMenuActive, setUserMenuActive] = useState(false)

    const logOut = () => {
        dispatch(setUser({}))
        dispatch(setIsAuth(false))
        localStorage.removeItem('token')
    }

    document.onclick = () => {
        if (userMenuActive) {
            setUserMenuActive(false)
        }
    }

    return (
        <div className={classes.bar}>
            <div className={classes.content}>
                <div className={classes.left}>
                    <NavLink className={classes.logo} to={START_ROUTE}></NavLink>
                    <div className={classes.links}>
                        <NavLink className={classes.link} to={SEARCH_ROUTE}>
                            Поиск
                        </NavLink>
                        <NavLink className={classes.link} to={PROFILE_ROUTE}>
                            Создать портфолио
                        </NavLink>
                    </div>
                </div>
                {user._isAuth
                ?
                    <div className={classes.right}>
                        <button className={classes.userInfo}
                            onClick={(e) => {
                                e.stopPropagation()
                                userMenuActive
                                ? setUserMenuActive(false)
                                : setUserMenuActive(true)
                            }}
                        >
                            <div className={classes.user_name}>
                                {user._user.email}
                            </div>
                            <div
                                className={classes.user_image}
                            >
                            </div>
                        </button>
                        {userMenuActive
                        ?
                            <div className={classes.userMenu} onClick={(e) => e.stopPropagation()}>
                                <NavLink className={classes.userMenu_button} to={PROFILE_ROUTE}>Мой профиль</NavLink>
                                <button className={classes.userMenu_button}>Настройки</button>
                                <button className={classes.userMenu_button}>Сохранить</button>
                                <button
                                    className={classes.userMenu_button}
                                    onClick={() => logOut()}
                                >
                                    Выйти
                                </button>
                            </div>
                        :
                            <div></div>
                        }
                        
                    </div>
                :
                    <div className={classes.right}>
                        <NavLink to={AUTH_ROUTE}
                            className={classes.authBtn}
                        >
                            Авторизация
                        </NavLink>
                        <NavLink to={REGISTRATION_ROUTE}
                            className={classes.authBtn}
                        >
                            Регистрация
                        </NavLink>
                    </div>
                }
            </div>
        </div>
    )
}

export default NavBar;