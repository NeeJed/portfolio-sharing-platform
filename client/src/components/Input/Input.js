import React, { useState } from 'react';
import classes from './Input.module.css';

const Input = ({...params}) => {
    return (
        <input
            {...params}
            className={classes.input}
        />
    )
}

export default Input;