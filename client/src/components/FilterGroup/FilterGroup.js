import React from 'react'
import classes from './FilterGroup.module.css'
import Checkbox from '../Checkbox/Checkbox'

const FilterGroup = ({dataList, title}) => {
    return (
        <div className={classes.filterBlock}>
            <h6 className={classes.filterBlock_name}>{title}</h6>
            {dataList.map(data => 
                <Checkbox key={data.id} data={data}/>
            )}
        </div>
    )
}

export default FilterGroup
