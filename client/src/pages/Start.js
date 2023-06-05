import React from 'react';
import classes from '../styles/Start.module.css';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Icons from '../components/Icons/Icons';
import { useNavigate, NavLink } from 'react-router-dom';
import { SEARCH_ROUTE, AUTH_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Start = () => {
    const navigate = useNavigate()
    return (
        <div
            className={classes.container}
            style={{minHeight: window.innerHeight - 50}}
        >
            <div className={classes.welcomeBox} style={{maxHeight: window.innerHeight - 50}}>
                <div className={classes.searchBox}>
                    {/* <Input placeholder='Имя, специальность...'/> */}
                    <Button
                        variant='primary_bg'
                        title='Перейти к поиску'
                        onClick={() => navigate(SEARCH_ROUTE)}
                    >
                        <Icons
                            name='search'
                            color='#f0f0f0'
                            size='26'
                            className={classes.searchBox__icon}
                        />
                    </Button>
                </div>
                <div className={classes.authregistrationBox}>
                    <Button
                        title='Авторизация'
                        variant='primary_bg'
                        onClick={() => navigate(AUTH_ROUTE)}
                    />
                    <Button
                        title='Регистрация'
                        variant='primary_bg'
                        onClick={() => navigate(REGISTRATION_ROUTE)}
                    />
                </div>
            </div>
            <div className={classes.box}>
                <h3 className={`${classes.box__title} ${classes.box__title_light}`}>
                    Полезные ресурсы для студентов
                </h3>
                <div className={classes.box__links}>
                    <div className={`${classes.box__data} ${classes.box__data_dark}`}>
                        <NavLink
                            to={'https://стипендиатроссии.рф/'}
                            className={classes.box__link_dark}
                        >
                            Стипендиант России
                        </NavLink>
                    </div>
                    <div className={`${classes.box__data} ${classes.box__data_light}`}>
                        <NavLink
                            to={'http://school-collection.edu.ru/'}
                            className={classes.box__link_light}
                        >
                            Единая коллекция
                            Цифровых образовательных ресурсов
                        </NavLink>
                    </div>
                    <div className={`${classes.box__data} ${classes.box__data_dark}`}>
                        <NavLink
                            to={'https://талантыроссии.рф/'}
                            className={classes.box__link_dark}
                        >
                            Государственный информационный ресурс об одаренных детях
                        </NavLink>
                    </div>
                    <div className={`${classes.box__data} ${classes.box__data_light}`}>
                        <NavLink
                            to={'https://sochisirius.ru/'}
                            className={classes.box__data_light}
                        >
                            Образовательный центр "Сириус"
                        </NavLink>
                    </div>
                    <div className={`${classes.box__data} ${classes.box__data_dark}`}>
                        <NavLink
                            to={'http://www.edu.ru/'}
                            className={classes.box__link_dark}
                        >
                            Федеральный портал "Российское образование"
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Start;