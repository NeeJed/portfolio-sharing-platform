import React, { useState, useEffect } from 'react'
import classes from './Select.module.css'
import Button from '../Button/Button'

const Select = ({title, dataList, setValue}) => {
    const [userMenuActive, setUserMenuActive] = useState(false)
    const [selectTitle, setSelectTitle] = useState(null)
    document.onclick = () => {
        if (userMenuActive) {
            setUserMenuActive(false)
        }
    }

    useEffect(() => {
        if (selectTitle !== title) {
            setSelectTitle(title)
        }
    }, [dataList])
    
    return (
        <div>
            <Button className={classes.userInfo}
                    title={selectTitle || title}
                    onClick={(e) => {
                        e.stopPropagation()
                        userMenuActive
                        ? setUserMenuActive(false)
                        : setUserMenuActive(true)
                    }}
            />
            {userMenuActive
            ?
                <div className={classes.userMenu} onClick={(e) => e.stopPropagation()}>
                    {dataList.map(elem => 
                        <Button
                            title={elem.name}
                            value={elem.id}
                            key={elem.id}
                            className={classes.userMenu_button}
                            onClick={(e) => {
                                setValue(e.target.value)
                                setSelectTitle(elem.name)
                                userMenuActive
                                ? setUserMenuActive(false)
                                : setUserMenuActive(true)
                            }}
                        />
                    )}
                </div>
            :
                <div></div>
            }
        </div>
    )
}

export default Select
