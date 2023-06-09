import React, { useEffect } from 'react'
import classes from './Checkbox.module.css'

const Checkbox = ({data, filterData, dispatch}) => {
    return (
        <div className={classes.checkboxContainer}>
            <input
                type='checkbox'
                id={`${data.name}${data.id}`}
                className={classes.filterBlock_option}
                onClick={() => dispatch ? dispatch(filterData(data.id)) : filterData(data.id)}
            />
            <label key={data.id} htmlFor={`${data.name}${data.id}`}>
                {data.name}
            </label>
        </div>
    )
}

export default Checkbox
