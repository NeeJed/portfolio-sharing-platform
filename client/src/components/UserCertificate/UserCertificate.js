import React, { useState } from 'react'
import classes from './UserCertificate.module.css'
import UserCertificateInfoModal from '../modals/UserCertificateInfoModal/UserCertificateInfoModal'
import Portal from '../Portal/Portal'
import Tooltip from '../Tooltip/Tooltip'

const UserCertificate = ({certificate}) => {
    const [certificateModalIsActive, setCertificateModalIsActive] = useState(false)
    const [tooltipIsOpen, setTooltipIsOpen] = useState(false)
    return (
        <div className={classes.certificate} onClick={() => !certificateModalIsActive ? setCertificateModalIsActive(true) : setCertificateModalIsActive(false)}>
            <Tooltip
                text='Сертификат успешно удалён'
                node={document.body}
                tooltipIsActive={tooltipIsOpen}
                setTooltipIsActive={setTooltipIsOpen}
            />
            {certificateModalIsActive &&
            <Portal>
                <UserCertificateInfoModal
                    setModalIsActive={setCertificateModalIsActive}
                    certificate={certificate}
                    setTooltipIsOpen={setTooltipIsOpen}
                />
            </Portal>
            }
            <div className={classes.description}>
                <h5 className={classes.description__title} title={certificate.name}>
                    {certificate.name}
                </h5>
            </div>
            <img
                src={process.env.REACT_APP_API_URL + `/` + certificate.img}
                className={classes.certificate__img}
            />
        </div> 
    )
}

export default UserCertificate
