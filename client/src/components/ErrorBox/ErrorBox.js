import React from 'react'
import ErrClasses from '../ErrorBox/Error.module.css';

const ErrorBox = ({...params}) => {
    return (
        <div className={ErrClasses.errorContainer}>
            <div className={ErrClasses.errorMessage}>
                {params.errorMessage}
            </div>
        </div>
    )
}

export default ErrorBox