import React from 'react';
import classes from './Button.module.css'

const Button = ({...params}) => {
    let buttonStyle;
    if (params.variant === 'primary') {
        buttonStyle = `${classes.button_primary}`;
    } else if (params.variant === 'primary_bg') {
        buttonStyle = `${classes.button_primary_bg}`;
    } else if (params.variant === 'contrast') {
        buttonStyle = `${classes.button_contrast}`;
    } else if (params.variant === 'error') {
        buttonStyle = `${classes.button_error}`;
    } else {
        buttonStyle = `${classes.button_primary}`;
    }
    return (
        <button
            className={`${classes.button} ${buttonStyle}`}
            {...params}
        >
            {params.children}
            {params.title}
        </button>
    )
}

export default Button;