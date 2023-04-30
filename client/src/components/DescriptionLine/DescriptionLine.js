import React from 'react'
import classes from './DescriptionLine.module.css'

const DescriptionLine = ({descriptionName, descriptionData}) => {
    return (
        <div className={classes.descriptionBlock}>
            <div className={classes.descriptionBlock_column}>
                {descriptionName}
            </div>
            <div className={classes.descriptionBlock_column}>
                <div className={classes.descriptionBlock_data}>
                    {descriptionData}
                </div>
            </div>
        </div>
    )
}

export default DescriptionLine
