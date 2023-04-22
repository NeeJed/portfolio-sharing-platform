import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfileData } from '../http/userAPI';

const UserPage = () => {
    const [user, setUser] = useState({})
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true)

    const getUserInfo = async () => {
        try {
            let data = await getUserProfileData(id)
            console.log(data)
            setUser(data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect( () => {
        getUserInfo()
    }, [])
    return (
        <div>
            {user.id}: {user.name}
        </div>
    )
}

export default UserPage;