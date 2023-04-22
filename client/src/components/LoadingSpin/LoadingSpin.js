import React from 'react'
import classes from '../LoadingSpin/LoadingSpin.module.css'

const LoadingSpin = ({...params}) => {
    let spinBox = classes.spinBox_fullpage
    let spin = classes.spin_fullpage
    if (params.type === 'fullpage') {
        spinBox = classes.spinBox_fullpage
        spin = classes.spin_fullpage
    } else if (params.type === 'component') {
        spinBox = classes.spinBox_component
        spin = classes.spin_component
    }
    return (
        <div className={`${classes.spinBox} ${spinBox}`}>
            <div className={`${classes.spin} ${spin}`}>
                
            </div>
        </div>
    )
}

export default LoadingSpin
