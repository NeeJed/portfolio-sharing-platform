import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classes from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { START_ROUTE, SEARCH_ROUTE, PROFILE_ROUTE, AUTH_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { setIsAuth } from '../store/UserStore';

const NavBar = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
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
                        <button
                            className={classes.user_logout}
                            onClick={() => dispatch(setIsAuth(false))}
                        >
                            Выйти
                        </button>
                        <NavLink className={classes.user_image} to={PROFILE_ROUTE}>
                            
                        </NavLink>
                    </div>
                :
                    <div className={classes.right}>
                        <NavLink to={AUTH_ROUTE}
                            className={classes.authBtn}
                            onClick={() => dispatch(setIsAuth(true))}
                        >
                            Авторизация
                        </NavLink>
                        <NavLink to={REGISTRATION_ROUTE}
                            className={classes.authBtn}
                            onClick={() => dispatch(setIsAuth(true))}
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