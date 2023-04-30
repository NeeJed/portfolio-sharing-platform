import React from 'react'
import classes from './DescriptionLineEditable.module.css'

const DescriptionLineEditable = ({descriptionName, descriptionData, edit}) => {
    return (
        <div className={classes.descriptionBlock}>
            <div className={classes.descriptionBlock_column}>
                {descriptionName}
            </div>
            <div className={classes.descriptionBlock_column}>
                <div className={classes.descriptionBlock_data}>
                    {descriptionData}
                </div>
                {edit}
            </div>
        </div>
    )
}

export default DescriptionLineEditable
