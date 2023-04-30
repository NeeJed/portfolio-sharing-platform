import React, { useEffect, useState } from 'react';
import classes from '../styles/Search.module.css';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTypes, fetchRanks, createType, createRank, deleteType, deleteRank, fetchCategories, createCategory } from '../http/certificateAPI';
import { setTypes, setRanks, setCategories } from '../store/CertificateStore';
import { getAllUsers } from '../http/userAPI';
import { setStudents, setTotalResults, setSelectedCategories, setSelectedTypes, setSelectedRanks } from '../store/StudentsStore';
import LoadingSpin from '../components/LoadingSpin/LoadingSpin';
import FilterGroup from '../components/FilterGroup/FilterGroup';
import { useNavigate } from 'react-router-dom';
import { SEARCH_ROUTE, USERPAGE_ROUTE } from '../utils/consts';
import UserCard from '../components/UserCard/UserCard';
import ErrorBox from '../components/ErrorBox/ErrorBox'
import Pages from '../components/Pages/Pages';
import Checkbox from '../components/Checkbox/Checkbox';

const Search = () => {
    const students = useSelector(state => state.students._students)
    const totalResults = useSelector(state => state.students._totalResults)
    const page = useSelector(state => state.students._page)
    const limit = useSelector(state => state.students._limit)
    const selectedCategories = useSelector(state => state.students._selectedCategories)
    const selectedTypes = useSelector(state => state.students._selectedTypes)
    const selectedRanks = useSelector(state => state.students._selectedRanks)
    const categories = useSelector(state => state.certificate._categories)
    const types = useSelector(state => state.certificate._types)
    const ranks = useSelector(state => state.certificate._ranks)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [studentsIsLoading, setStudentsIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

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
    const getStudents = async () => {
        try {
            let data = await getAllUsers(
                selectedCategories, selectedTypes, selectedRanks, page, limit
            )
            dispatch(setStudents(data.rows))
            dispatch(setTotalResults(data.count))
            console.log('студенты: ', data.rows)
        } catch (e) {
            console.log(e)
        } finally {
            setStudentsIsLoading(false)
        }
    }

    useEffect( () => {
        getCategories()
        getTypes()
        getRanks()
        getStudents()
    }, [])
    
    useEffect(() => {
        getStudents()
    }, [page, selectedCategories, selectedTypes, selectedRanks])
    
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
                    <span className={classes.searchData}>
                        Получено результатов: {totalResults}
                    </span>
                </div>
                <div className={classes.mainBox_content}>

                    <div className={classes.mainBox_filter}>
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

                    <aside className={classes.mainBox_filter}>
                        {
                            errorMessage !== ''
                            ?
                            <ErrorBox
                                errorMessage={errorMessage}
                            />
                            :
                            <div></div>
                        }
                        {/* <FilterGroup dataList={categories} filterData={setSelectedCategories} title='Категория'/> */}
                        {categories.map(category => 
                            <div>
                                <h6>{category.name}</h6>
                                {types.map(type => type.categoryId === category.id ?
                                    <Checkbox key={type.id} data={type} filterData={setSelectedTypes}/>
                                    : false
                                )}
                            </div>
                        )}
                        {/* <FilterGroup dataList={types} filterData={setSelectedTypes} title='Тип'/> */}
                        <FilterGroup dataList={ranks} filterData={setSelectedRanks} title='Уровень достижения'/>
                    </aside>
                    <section className={classes.mainBox_searchResults}>
                        {!studentsIsLoading
                        ?
                            students.length
                            ?
                                <div>
                                    {students.map(student =>
                                        <UserCard user={student}/>
                                    )}
                                </div>
                            :
                                <div>Нет результатов</div>
                        : <LoadingSpin type='component'/>
                        }
                        <Pages/>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Search;