import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchTypes, fetchRanks, createType, createRank, deleteType, deleteRank, fetchCategories, createCategory } from '../../http/certificateAPI';
import { setTypes, setRanks, setCategories } from '../../store/CertificateStore';
import ErrorBox from '../ErrorBox/ErrorBox';

const AdminFilterEditing = () => {
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState('')

    const getCategories = async () => {
        try {
            let {data} = await fetchCategories()
            dispatch(setCategories(data))
            console.log('категории: ', data)
        } catch (e) {
            console.log(e)
        }
    }
    const getTypes = async () => {
        try {
            let {data} = await fetchTypes()
            dispatch(setTypes(data))
            console.log('типы: ', data)
        } catch (e) {
            console.log(e)
        }
    }
    const getRanks = async () => {
        try {
            let {data} = await fetchRanks()
            dispatch(setRanks(data))
            console.log('уровни: ', data)
        } catch (e) {
            console.log(e)
        }
    }
    const [category, setCategory] = useState()
    const addCategory = async () => {
        let data;
        try {
            data = await createCategory({name: category})
            getCategories()
        } catch (e) {
            console.log(e)
        }
    }

    const [categoryForType, setCategoryForType] = useState()
    const [type, setType] = useState()
    const addType = async () => {
        let data;
        try {
            data = await createType({name: type, categoryId: categoryForType})
            getTypes()
        } catch (e) {
            setErrorMessage(e.response.data.message)
            console.log(e.response.data.message)
        }
    }

    const [rank, setRank] = useState()
    const addRank = async () => {
        let data;
        try {
            data = await createRank({name: rank})
            getRanks()
        } catch (e) {
            setErrorMessage(e.response.data.message)
            console.log(e.response.data.message)
        }
    }

    const [typeId, setTypeId] = useState()
    const removeType = async () => {
        let data;
        try {
            data = await deleteType(typeId)
            console.log(data)
            getTypes()
        } catch (e) {
            setErrorMessage(e.response.data.message)
            console.log(e.response.data.message)
        }
    }
    const [rankId, setRankId] = useState()
    const removeRank = async () => {
        let data;
        try {
            data = await deleteRank(rankId)
            console.log(data)
            getRanks()
        } catch (e) {
            setErrorMessage(e.response.data.message)
            console.log(e.response.data.message)
        }
    }
    return (
        <div>
            {
                errorMessage !== '' && <ErrorBox errorMessage={errorMessage}/>
            }
            <div>
                <input
                    placeholder='категория'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button onClick={() => addCategory()}>Добавить</button>
            </div>
            <div>
                <input
                    placeholder='Категория, к которой относится тип'
                    value={categoryForType}
                    onChange={(e) => setCategoryForType(e.target.value)}
                />
                <input
                    placeholder='тип'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <button onClick={() => addType()}>Добавить</button>
            </div>
            <div>
                <input
                    placeholder='уровень'
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                />
                <button onClick={() => addRank()}>Добавить</button>
            </div>
            <div>
                <input
                    placeholder='Удалить тип по id'
                    value={typeId}
                    onChange={(e) => setTypeId(e.target.value)}
                />
                <button onClick={() => removeType()}>Удалить</button>
            </div>
            <div>
                <input
                    placeholder='Удалить уровень по id'
                    value={rankId}
                    onChange={(e) => setRankId(e.target.value)}
                />
                <button onClick={() => removeRank()}>Удалить</button>
            </div>
        </div>
    )
}

export default AdminFilterEditing
