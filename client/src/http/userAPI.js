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

export const getAllUsers = async (categoryId, typeId, rankId, educationalStageId, page, limit) => {
    const {data} = await $host.get(`api/user/allusers`, {params: {
        categoryId, typeId, rankId, educationalStageId, page, limit
    }})
    return data;
}

export const updateUserShareAccess = async (id, access) => {
    const {data} = await $host.put(`api/user/userShareAccess${id}/${access}`, {params: {id, access}})
    return data;
}

export const updateUserInfo = async (userInfo) => {
    const {data} = await $host.put(`api/user/userInfo`, userInfo)
    return data;
}

export const getAllEducationalStages = async () => {
    const {data} = await $host.get(`api/educationalStage`)
    return data;
}

export const getOneEducationalStage = async (id) => {
    const {data} = await $host.get(`api/educationalStage/getOneById` + id, id)
    return data;
}

export const createEducationalStage = async (educationalStage) => {
    const {data} = await $host.post(`api/educationalStage/`, educationalStage)
    return data;
}

export const deleteEducationalStage = async (id) => {
    const {data} = await $authHost.delete('/api/educationalStage/deleteById' + id, id)
    return {data}
}
