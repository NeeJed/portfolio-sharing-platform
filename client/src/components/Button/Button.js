import React from 'react';
import classes from './Button.module.css'

const Button = ({title, type, variant}) => {
    let buttonStyle;
    if (variant === 'primary') {
        buttonStyle = `${classes.button_primary}`;
    } else if (variant === 'contrast') {
        buttonStyle = `${classes.button_contrast}`;
    } else {
        buttonStyle = `${classes.button_primary}`;
    }
    return (
        <button
            type={type}
            className={`${classes.button} ${buttonStyle}`}
        >
            {title}
        </button>
    )
}

export default Button;