import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getUserProfileData = async (id) => {
    const {data} = await $host.get(`api/user/profile` + id, {id})
    return data;
}

export const getAllUsers = async (categoryId, typeId, rankId, page, limit) => {
    const {data} = await $host.get(`api/user/allusers`, {params: {
        categoryId, typeId, rankId, page, limit
    }})
    return data;
}

export const updateUserShareAccess = async (id, access) => {
    const {data} = await $host.put(`api/user/userShareAccess${id}/${access}`, {params: {id, access}})
    return data;
}

export const updateUserInfo = async (id, name, lastName, birthday, phone) => {
    console.log(id, name, lastName, birthday, phone)
    const {data} = await $host.put(`api/user/userInfo` + id, {params: {id, name, lastName, birthday, phone}})
    return data;
}