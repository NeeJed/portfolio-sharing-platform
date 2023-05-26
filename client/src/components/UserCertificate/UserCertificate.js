import React, { useState } from 'react'
import classes from './UserCertificate.module.css'
import { useSelector } from 'react-redux'
import UserCertificateInfoModal from '../modals/UserCertificateInfoModal/UserCertificateInfoModal'
import Portal from '../Portal/Portal'

const UserCertificate = ({certificate}) => {
    const categories = useSelector(state => state.certificate._categories)
    const types = useSelector(state => state.certificate._types)
    const ranks = useSelector(state => state.certificate._ranks)
    // console.log(certificate)
    const [certificateModalIsActive, setCertificateModalIsActive] = useState(false)
    const [tooltipIsOpen, setTooltipIsOpen] = useState(false)
    return (
        <div className={classes.certificate} onClick={() => !certificateModalIsActive ? setCertificateModalIsActive(true) : setCertificateModalIsActive(false)}>
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
                <h5 className={classes.description__title}>
                    {certificate.name}
                </h5>
                <div>{certificate.categoryId}</div>
            </div>
            <img
                src={process.env.REACT_APP_API_URL + `/` + certificate.img}
                className={classes.certificate__img}
            />
            {/* {certificate.info.length > 0 && certificate.info.map((info) => 
                <div className={classes.info}>
                    <div className={classes.info__title}>
                        {info.title}
                    </div>
                    <div className={classes.info__text}>
                        {info.description}
                    </div>
                </div>
            )} */}
        </div> 
    )
}

export default UserCertificate
