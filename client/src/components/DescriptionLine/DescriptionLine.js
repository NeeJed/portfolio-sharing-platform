import React from 'react'
import classes from './DescriptionLine.module.css'

const DescriptionLine = ({descriptionName, descriptionData, className}) => {
    return (
        <div className={`${classes.descriptionBlock} ${className}`}>
            <div title={descriptionName} className={classes.descriptionBlock_column}>
                {descriptionName}
            </div>
            <div className={classes.descriptionBlock_column}>
                <div title={descriptionData} className={classes.descriptionBlock_data}>
                    {descriptionData}
                </div>
            </div>
        </div>
    )
}

export default DescriptionLine
