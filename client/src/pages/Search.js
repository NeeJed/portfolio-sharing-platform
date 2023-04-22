import React, { useEffect, useState } from 'react';
import classes from '../styles/Search.module.css';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTypes, fetchRanks, createType, createRank, deleteType, deleteRank } from '../http/certificateAPI';
import { setTypes, setRanks } from '../store/CertificateStore';
import { getAllUsers } from '../http/userAPI';
import { setStudents } from '../store/StudentsStore';
import Checkbox from '../components/Checkbox/Checkbox';
import LoadingSpin from '../components/LoadingSpin/LoadingSpin';
import FilterGroup from '../components/FilterGroup/FilterGroup';
import { useNavigate } from 'react-router-dom';
import { SEARCH_ROUTE, USERPAGE_ROUTE } from '../utils/consts';
import UserCard from '../components/UserCard/UserCard';

const Search = () => {
    const students = useSelector(state => state.students._students)
    const certificates = useSelector(state => state.certificate._certificates)
    const types = useSelector(state => state.certificate._types)
    const ranks = useSelector(state => state.certificate._ranks)
    const dispatch = useDispatch()
    const [studentsIsLoading, setStudentsIsLoading] = useState(true)

    const navigate = useNavigate()

    const [type, setType] = useState()
    const addType = async () => {
        let data;
        try {
            data = await createType({name: type})
            getTypes()
        } catch (e) {
            console.log(e)
        }
    }

    const [rank, setRank] = useState()
    const addRank = async () => {
        let data;
        try {
            data = await createRank({name: rank})
            getRanks()
        } catch (e) {
            console.log(e)
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
            console.log(e)
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
            console.log(e)
        }
    }

    const getTypes = async () => {
        try {
            let {data} = await fetchTypes()
            dispatch(setTypes(data))
            console.log(data)
        } catch (e) {
            console.log(e)
        } finally {
            
        }
    }

    const getRanks = async () => {
        try {
            let {data} = await fetchRanks()
            dispatch(setRanks(data))
            console.log(data)
        } catch (e) {
            console.log(e)
        } finally {

        }
    }

    const getStudents = async () => {
        try {
            let data = await getAllUsers()
            dispatch(setStudents(data))
            console.log(data)
        } catch (e) {
            console.log(e)
        } finally {
            setStudentsIsLoading(false)
        }
    }

    useEffect( () => {
        try {
            getTypes()
            getStudents()
            getRanks()
            // fetchTypes().then(({data}) => {
            //     dispatch(setTypes(data))
            // })
            // getAllUsers().then(data => {
            //     dispatch(setStudents(data))
            // })
        } catch (e) {
            console.log(e)
        }
    }, [])
    
    return (
        <div
            className={classes.container}
            style={{minHeight: window.innerHeight - 50}}
        >
            <div className={classes.searchBox}>
                <div className={classes.searchBox_content}>
                    <Input type='text' placeholder='Найти...'/>
                    <Button title='Поиск' variant='contrast'/>
                </div>
            </div>
            <div className={classes.mainBox}>
                <div className={classes.mainBox_stats}>
                    <div className={classes.searchData}>
                        Получено результатов: {students.length}
                    </div>
                </div>
                <div className={classes.mainBox_content}>

                    <div className={classes.mainBox_filter}>
                        <div>
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

                    <div className={classes.mainBox_filter}>
                        <FilterGroup dataList={types} title='Типы'/>
                        <FilterGroup dataList={ranks} title='Уровень достижения'/>
                        <FilterGroup dataList={students} title='Юзеры'/>
                    </div>
                    <div className={classes.mainBox_searchResults}>
                        {!studentsIsLoading
                        ?
                            <div>
                                {students.map(student =>
                                    <UserCard user={student}/>
                                )}
                            </div>
                        : <LoadingSpin type='component'/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;