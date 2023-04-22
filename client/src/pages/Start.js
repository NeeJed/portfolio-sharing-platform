import React from 'react';
import classes from '../styles/Start.module.css';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

const Start = () => {
    return (
        <div
            className={classes.container}
            style={{minHeight: window.innerHeight - 50}}
        >
            <div className={classes.welcomeBox} style={{maxHeight: window.innerHeight - 50}}>
                <div className={classes.searchBox}>
                    <Input placeholder='Имя, специальность...'/>
                    <Button variant='primary_bg' title='Найти'/>
                </div>
            </div>
        </div>
    )
}

export default Start;