import React from 'react'
import classes from './Checkbox.module.css'
import { useDispatch } from 'react-redux'

const Checkbox = ({data, filterData}) => {
    const dispatch = useDispatch()
    return (
        <div className={classes.checkboxContainer}>
            <input
                type='checkbox'
                id={`${data.name}${data.id}`}
                className={classes.filterBlock_option}
                onClick={() => dispatch(filterData(data.id))}
            />
            <label key={data.id} htmlFor={`${data.name}${data.id}`}>
                {data.name}
            </label>
        </div>
    )
}

export default Checkbox
