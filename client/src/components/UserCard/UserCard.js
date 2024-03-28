import React, { useEffect, useRef, useState } from 'react'
import classes from './UserCard.module.css'
import { useNavigate, Link } from 'react-router-dom';
import { USERPAGE_ROUTE } from '../../utils/consts';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCertificates, fetchCertificatesByUserId } from '../../http/certificateAPI';
import LoadingSpin from '../LoadingSpin/LoadingSpin';
import { fetchOneCity } from '../../http/locationAPI';

const UserCard = ({user}) => {
    const students = useSelector(state => state.students._students)
    const educationalStages = useSelector(state => state.students._educationalStages)
    const page = useSelector(state => state.students._page)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userCertificatesIsLoading, setUserCertificatesIsLoading] = useState(true)
    const [userCertificates, setUserCertificates] = useState({rows: []})
    const [userCity, setUserCity] = useState()
    const [userEducationalStageName, setUserEducationalStageName] = useState('')

    const getCertificates = async () => {
        try {
            let {data} = await fetchCertificatesByUserId(user.userId)
            setUserCertificates(data)
        } catch (e) {
            console.log(e)
        } finally {
            setUserCertificatesIsLoading(false)
        }
    }
    const getUserCity = async () => {
        try {
            let data = await fetchOneCity(user.cityId)
            dispatch(setUserCity(data.name))
        } catch (e) {
            console.log(e)
        }
    }
    const getUserEducationalStageName = () => {
        let userEducationalStage = educationalStages.filter((stage) => stage.id === user.educationalStageId)
        if (userEducationalStage.length) {
            setUserEducationalStageName(userEducationalStage[0].name)
        }
    }

    useEffect(() => {
        getCertificates()
        getUserCity()
        getUserEducationalStageName()
    }, [])
    
    useEffect(() => {
        getCertificates()
    }, [page, students])

    return (
        <div
            className={classes.searchResult}
            key={user.id}
        >
            <Link className={classes.userInfo} to={`${USERPAGE_ROUTE+ '/' + user.userId}`}>
                <img
                    className={classes.userImg}
                    src={`${process.env.REACT_APP_API_URL}/${user.img}`}
                    alt={user.name}
                />
                <div className={`${classes.userData} ${classes.userName}`}>
                    {user.name} {user.lastName}
                </div>
                {userCity &&
                    <div className={`${classes.userData} ${classes.userLocation}`}>
                        {userCity}
                    </div>
                }
                {userEducationalStageName &&
                    <div className={`${classes.userData} ${classes.userEducationalStage}`}>
                        {userEducationalStageName}
                    </div>
                }
            </Link>
            <div className={classes.userCertificates}>
                {userCertificatesIsLoading 
                ?
                    <LoadingSpin type='component'/>
                :
                    userCertificates.count
                    ?
                        userCertificates.certificate.map((certificate, index) => 
                            index < 12 &&
                            <div
                                className={classes.certificate}
                                key={certificate.id}
                            >
                                <img
                                    className={classes.certificateImg}
                                    src={process.env.REACT_APP_API_URL + `/` + certificate.img}
                                />
                            </div>
                        )
                    :
                        <div>Нет достижений</div>
                }
            </div>
        </div>
    )
}

export default UserCard
