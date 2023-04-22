import React from 'react'
import classes from './UserCard.module.css'
import { useNavigate } from 'react-router-dom';
import { USERPAGE_ROUTE } from '../../utils/consts';
import { useSelector } from 'react-redux';

const UserCard = ({user}) => {
    const certificates = useSelector(state => state.certificate._certificates)
    const navigate = useNavigate()
    return (
        <div
            className={classes.searchResult}
            key={user.id}
            onClick={() => navigate(`${USERPAGE_ROUTE+'/'+user.userId}`)}
        >
            <div className={classes.userInfo}>
                <img className={classes.userImg} src={`${process.env.REACT_APP_API_URL}/${user.img}`} alt={user.name}/>
                <div className={classes.userName}>
                    {user.name} {user.lastName}
                </div>
                <div className={classes.userRating}>
                    {user.rating}
                </div>
            </div>
            <div className={classes.userCertificates}>
                {certificates.map(certificate => 
                    <div
                        className={classes.certificate}
                        key={certificate.id}
                    >
                        <img className={classes.certificateImg} src={certificate.img}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserCard
