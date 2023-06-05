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
import Filter from '../components/Filter/Filter';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/UserCard/UserCard';
import ErrorBox from '../components/ErrorBox/ErrorBox'
import Pages from '../components/Pages/Pages';
import FilterGroup from '../components/FilterGroup/FilterGroup';
import AdminFilterEditing from '../components/AdminFilterEditing/AdminFilterEditing';
import Icons from '../components/Icons/Icons';

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
            {/* <div className={classes.searchBox}>
                <div className={classes.searchBox_content}>
                    <Input type='text' placeholder='Найти...'/>
                    <Button title='Поиск' variant='contrast'>
                        <Icons
                            name='search'
                            color='#000'
                            size='26'
                            className={classes.searchBox__icon}
                        />
                    </Button>
                </div>
            </div> */}
            <div className={classes.mainBox}>
                <div className={classes.mainBox_stats}>
                    <span className={classes.searchData}>
                        Получено результатов: {totalResults}
                    </span>
                </div>
                <div className={classes.mainBox_content}>
                    {/* <AdminFilterEditing/> */}
                    <aside className={classes.mainBox_filter}>
                        <FilterGroup titlesList={categories} dataList={types} filterData={setSelectedTypes}/>
                        <Filter dataList={ranks} filterData={setSelectedRanks} title='Уровень достижения'/>
                    </aside>
                    <section className={classes.mainBox_searchResults}>
                        {!studentsIsLoading
                        ?
                            students.length
                            ?
                                <div>
                                    {students.map(student =>
                                        <UserCard key={student.id} user={student}/>
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