import React, { useState } from 'react';
import classes from './Input.module.css';

const Input = ({type, placeholder}) => {
    const [val, setVal] = useState('');
    return (
        <input
            className={classes.input}
            value={val}
            type={type}
            placeholder={placeholder}
            onChange={(e) => setVal(e.target.value)}
        />
    )
}

export default Input;