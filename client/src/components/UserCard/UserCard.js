import React, { useEffect, useRef, useState } from 'react'
import classes from './UserCard.module.css'
import { useNavigate, Link } from 'react-router-dom';
import { USERPAGE_ROUTE } from '../../utils/consts';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCertificates, fetchCertificatesByUserId } from '../../http/certificateAPI';
import LoadingSpin from '../LoadingSpin/LoadingSpin';

const UserCard = ({user}) => {
    const students = useSelector(state => state.students._students)
    const page = useSelector(state => state.students._page)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userCertificatesIsLoading, setUserCertificatesIsLoading] = useState(true)
    const [userCertificates, setUserCertificates] = useState({rows: []})

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

    useEffect(() => {
        getCertificates()
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
                <div className={classes.userName}>
                    {user.name} {user.lastName}
                </div>
            </Link>
            <div className={classes.userCertificates}>
                {userCertificatesIsLoading 
                ?
                    <LoadingSpin type='component'/>
                :
                    userCertificates.count
                    ?
                        userCertificates.rows.map((certificate, index) => 
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
