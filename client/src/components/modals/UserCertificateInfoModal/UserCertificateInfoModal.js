import React, { useEffect, useState } from 'react'
import classes from './UserCertificateInfoModal.module.css'
import DescriptionLine from '../../DescriptionLine/DescriptionLine'
import Icons from '../../Icons/Icons'
import { fetchOneCategory, fetchOneType, fetchOneRank, deleteCertificate } from '../../../http/certificateAPI'
import { useSelector } from 'react-redux'
import Button from '../../Button/Button'
import CreateCertificate from '../../CreateCertificate/CreateCertificate'
import Portal from '../../Portal/Portal'
import Tooltip from '../../Tooltip/Tooltip'

const UserCertificateInfoModal = ({setModalIsActive, certificate, setTooltipIsOpen}) => {
    const categories = useSelector(state => state.certificate._categories)
    const types = useSelector(state => state.certificate._types)
    const ranks = useSelector(state => state.certificate._ranks)

    const [category, setCategory] = useState({})
    const [type, setType] = useState({})
    const [rank, setRank] = useState({})
    const [isCertificateEdit, setIsCertificateEdit] = useState(false)
    const [changeCertificateTooltipIsOpen, setChangeCertificateTooltipIsOpen] = useState(false)

    const deleteCertificateInfo = async () => {
        try {
            let {data} = await deleteCertificate(certificate.id)
            console.log(data)
            if (data === 1) {
                setTooltipIsOpen(true)
            }
        } catch (e) {
            console.log(e.response.data.message)
        } finally {
            setModalIsActive(false)
        }
    }

    useEffect(() => {
        let category = categories.filter(item => item.id === certificate.categoryId)
        setCategory(category[0])
        let type = types.filter(item => item.id === certificate.typeId)
        setType(type[0])
        let rank = ranks.filter(item => item.id === certificate.rankId)
        setRank(rank[0])
    }, [])
    return (
        <div className={classes.modalWrapper} onClick={(e) => setModalIsActive(false)}>
            <div className={classes.modalContainer} onClick={(e) => e.stopPropagation()}>
                <Tooltip
                    text='Данные сертификата успешно изменены'
                    node={document.body}
                    tooltipIsActive={changeCertificateTooltipIsOpen}
                    setTooltipIsActive={setChangeCertificateTooltipIsOpen}
                />
                <div className={classes.buttonClose__container} onClick={() => setModalIsActive(false)}>
                    <Icons
                        name='close'
                        color='#000'
                        size='64'
                        className={classes.buttonClose}
                    />
                </div>
                <img
                    src={process.env.REACT_APP_API_URL + `/` + certificate.img}
                    className={classes.certificate__img}
                />
                <div className={classes.description}>
                    <h5 className={classes.description__title}>
                        {certificate.name}
                    </h5>
                    <DescriptionLine descriptionName='Категория' descriptionData={category.name}/>
                    <DescriptionLine descriptionName='Тип' descriptionData={type.name}/>
                    <DescriptionLine descriptionName='Уровень' descriptionData={rank.name}/>
                </div>
                {certificate.info.length > 0 && certificate.info.map((info, index) => 
                    <div className={classes.info} key={index}>
                        <DescriptionLine descriptionName={info.title} descriptionData={info.description}/>
                    </div>
                )}
                {isCertificateEdit &&
                    <Portal>
                        <CreateCertificate setModalIsActive={setIsCertificateEdit} setTooltipIsOpen={setChangeCertificateTooltipIsOpen} isEdit={true} certificate={certificate}/>
                    </Portal>
                }
                <Button
                    title='Редактировать'
                    onClick={() => setIsCertificateEdit(true)}
                />
                <Button
                    title='Удалить'
                    variant='error'
                    onClick={() => deleteCertificateInfo()}
                />
            </div>
        </div>
    )
}

export default UserCertificateInfoModal
