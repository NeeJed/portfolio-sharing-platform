import React from 'react';
import classes from '../styles/Start.module.css';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Icons from '../components/Icons/Icons';

const Start = () => {
    return (
        <div
            className={classes.container}
            style={{minHeight: window.innerHeight - 50}}
        >
            <div className={classes.welcomeBox} style={{maxHeight: window.innerHeight - 50}}>
                <div className={classes.searchBox}>
                    <Input placeholder='Имя, специальность...'/>
                    <Button variant='primary_bg' title='Найти'>
                        <Icons
                            name='search'
                            color='#f0f0f0'
                            size='26'
                            className={classes.searchBox__icon}
                        />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Start;