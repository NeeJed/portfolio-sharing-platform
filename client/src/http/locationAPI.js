import {$authHost, $host} from './index'

export const fetchRegions = async () => {
    const {data} = await $host.get('api/region',)
    return {data}
}

export const fetchOneRegion = async (regionId) => {
    console.log(regionId)
    const {data} = await $host.get('api/region/getOneById' + regionId, {regionId})
    return {data}
}

export const fetchCities = async () => {
    const {data} = await $host.get('api/city',)
    return {data}
}

export const fetchOneCity = async (cityId) => {
    console.log(cityId)
    const {data} = await $host.get('api/city/getOneById' + cityId, {cityId})
    return data
}

export const fetchCitiesByRegionId = async (regionId) => {
    const {data} = await $host.get('api/city/byRegionId' + regionId, {regionId})
    return {data}
}