import {$authHost, $host} from './index'

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category)
    return {data}
}

export const deleteCategory = async (categoryId) => {
    const {data} = await $authHost.delete('api/category/deleteById' + categoryId, {categoryId})
    return {data}
}

export const fetchCategories = async () => {
    const {data} = await $host.get('api/category',)
    return {data}
}

export const fetchOneCategory = async (categoryId) => {
    console.log(categoryId)
    const {data} = await $host.get('api/category/getOneById' + categoryId, {categoryId})
    return {data}
}

export const createType = async ({name, categoryId}) => {
    const {data} = await $authHost.post('api/type', {name, categoryId} )
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

export const fetchOneType = async (typeId) => {
    const {data} = await $host.get('api/type/getOneById' + typeId, {typeId})
    return {data}
}

export const fetchTypesByCategoryId = async (categoryId) => {
    const {data} = await $host.get('api/type/byCategoryId' + categoryId, {categoryId})
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

export const fetchOneRank = async (rankId) => {
    const {data} = await $host.get('api/rank/getOneById' + rankId, {rankId})
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
    const {data} = await $host.get('/api/certificate/' + id, + id)
    return {data}
}

export const fetchCertificatesByUserId = async (id) => {
    const {data} = await $host.get('/api/certificate/user/' + id, {id})
    return {data}
}

export const updateCertificate = async (certificate) => {
    const {data} = await $authHost.put('/api/certificate/update', certificate)
    return {data}
}

export const deleteCertificate = async (id) => {
    console.log(id)
    const {data} = await $authHost.delete('/api/certificate/delete' + id, id)
    return {data}
}