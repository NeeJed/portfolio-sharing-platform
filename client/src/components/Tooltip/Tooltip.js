import React from 'react'
import classes from './Tooltip.module.css'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

const Tooltip = ({text, children, node, tooltipIsActive, setTooltipIsActive}) => {
    const transitionClasses = {
        enter: classes['example-enter'],
        enterActive: classes['example-enter-active'],
        exit: classes['example-exit'],
        exitActive: classes['example-exit-active'],
    }
    tooltipIsActive && setTimeout(() => {
        setTooltipIsActive(false)
    }, 2500)
    return (
        createPortal(
            <CSSTransition in={tooltipIsActive} timeout={1000} classNames={transitionClasses} unmountOnExit>
                <div className={classes.tooltipContainer}>
                    <div className={classes.tooltip_title}>{text}</div>
                    {children}
                </div>
            </CSSTransition>
            , node
        )
    )
}

export default Tooltip
