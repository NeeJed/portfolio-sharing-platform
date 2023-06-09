import React from 'react'
import classes from './FilterGroup.module.css'
import Checkbox from '../Checkbox/Checkbox'

const FilterGroup = ({titlesList, dataList, filterData, dispatch}) => {
    return (
        <div className={classes.filterGroup}>
            {titlesList.map(title => 
            <div key={title.id}>
                <h6>{title.name}</h6>
                {dataList.map(data => data.categoryId === title.id &&
                    <Checkbox key={data.id} data={data} filterData={filterData} dispatch={dispatch}/>
                )}
            </div>
            )}
        </div>
    )
}

export default FilterGroup