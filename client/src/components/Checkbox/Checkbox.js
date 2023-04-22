import React from 'react'
import classes from './Checkbox.module.css'

const Checkbox = ({data}) => {
    return (
        <div>
            <input type='checkbox' id={`${data.name}${data.id}`} className={classes.filterBlock_option}/>
            <label key={data.id} htmlFor={`${data.name}${data.id}`}>
                {data.name}
            </label>
        </div>
    )
}

export default Checkbox
