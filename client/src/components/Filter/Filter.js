import React from 'react'
import classes from './Filter.module.css'
import Checkbox from '../Checkbox/Checkbox'

const Filter = ({dataList, filterData, title, dispatch}) => {
    return (
        <div className={classes.filterBlock}>
            <h6 className={classes.filterBlock_name}>{title}</h6>
            {dataList.map(data => 
                <Checkbox key={data.id} data={data} filterData={filterData} dispatch={dispatch}/>
            )}
        </div>
    )
}

export default Filter
