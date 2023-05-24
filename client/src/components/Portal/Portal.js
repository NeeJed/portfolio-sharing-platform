import React from 'react'
import { createPortal } from 'react-dom'

const Portal = ({children}) => {
    return (
        createPortal(
            <div>
                {children}
            </div>
            , document.body)
    )
}

export default Portal
