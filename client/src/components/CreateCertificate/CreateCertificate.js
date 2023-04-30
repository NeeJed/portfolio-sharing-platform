import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Input from '../Input/Input'
import { createCertificate } from '../../http/certificateAPI'
import Button from '../Button/Button'
import classes from './CreateCertificate.module.css'
import Select from '../Select/Select'

const CreateCertificate = () => {
    const user = useSelector(state => state.user._user)
    const categories = useSelector(state => state.certificate._categories)
    const types = useSelector(state => state.certificate._types)
    const ranks = useSelector(state => state.certificate._ranks)

    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [category, setCategory] = useState(null)
    const [type, setType] = useState(null)
    const [rank, setRank] = useState(null)
    const [info, setInfo] = useState([])

    const selectFile = e => {
        setFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addCertificate = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('categoryId', category)
        formData.append('typeId', type)
        formData.append('rankId', rank)
        formData.append('userId', user.id)
        formData.append('img', file)
        formData.append('info', JSON.stringify(info))
        try {
            createCertificate(formData)
        } catch (e) {
            console.log(e)
        }
    }
    
    return (
        <div className={classes.createCertificate_container}>
            <Input
                placeholder='Введите название'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Select dataList={categories} title='Выберите категорию' setValue={setCategory}/>
            <Select dataList={types} title='Выберите тип' setValue={setType}/>
            <Select dataList={ranks} title='Выберите уровень' setValue={setRank}/>
            <Input
                type='file'
                onChange={selectFile}
            />
            <Button
                onClick={addInfo}
                title='Добавить описание'
            />
            {info.map(i =>
                <div key={i.number}>
                    <input
                        placeholder='Введите название описания'
                        value={i.title}
                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                    />
                    <input
                        placeholder='Введите описание'
                        value={i.description}
                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                    />
                </div>
            )}
            <Button
                onClick={(e) => addCertificate(info)}
                title='Добавить достижение'
            />
        </div>
    )
}

export default CreateCertificate
