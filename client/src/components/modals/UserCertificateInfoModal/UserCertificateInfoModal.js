import React from 'react'
import classes from './UserCertificateInfoModal.module.css'
import DescriptionLine from '../../DescriptionLine/DescriptionLine'
import Close from '../../../assets/Close/Close'

const UserCertificateInfoModal = ({setModalIsActive, certificate, setTooltipIsOpen}) => {
    return (
        <div className={classes.modalWrapper} onClick={(e) => setModalIsActive(false)}>
            <div className={classes.modalContainer} onClick={(e) => e.stopPropagation()}>
                <Close style={{backgroundColor: 'red'}}/>
                <img
                    src={process.env.REACT_APP_API_URL + `/` + certificate.img}
                    className={classes.certificate__img}
                />
                <div className={classes.description}>
                    <h5 className={classes.description__title}>
                        {certificate.name}
                    </h5>
                    <DescriptionLine descriptionName='Категория' descriptionData={certificate.categoryId}/>
                    <DescriptionLine descriptionName='Тип' descriptionData={certificate.typeId}/>
                    <DescriptionLine descriptionName='Уровень' descriptionData={certificate.rankId}/>
                </div>
                {certificate.info.length > 0 && certificate.info.map((info) => 
                    <div className={classes.info}>
                        <DescriptionLine descriptionName={info.title} descriptionData={info.description}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserCertificateInfoModal
