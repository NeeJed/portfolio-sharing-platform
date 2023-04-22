import {$authHost, $host} from './index'

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return {data}
}

export const deleteType = async (typeId) => {
    const {data} = await $authHost.delete('api/type/deleteById' + typeId, {typeId})
    return {data}
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type',)
    return {data}
}

export const createRank = async (rank) => {
    const {data} = await $authHost.post('api/rank', rank)
    return {data}
}

export const deleteRank = async (rankId) => {
    const {data} = await $authHost.delete('api/rank/deleteById' + rankId, {rankId})
    return {data}
}

export const fetchRanks = async () => {
    const {data} = await $host.get('/api/rank',)
    return {data}
}

export const createCertificate = async (certificate) => {
    const {data} = await $authHost.post('api/certificate', certificate)
    return {data}
}

export const fetchCertificates = async () => {
    const {data} = await $host.get('/api/certificate',)
    return {data}
}

export const fetchOneCertificate = async (id) => {
    const {data} = await $host.get('/api/certificate/', + id)
    return {data}
}