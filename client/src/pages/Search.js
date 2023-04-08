import React from 'react';
import classes from '../styles/Search.module.css';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { useSelector } from 'react-redux';

const Search = () => {
    const students = useSelector(state => state.students._students);
    const certificates = useSelector(state => state.certificate._certificates);
    return (
        <div
            className={classes.container}
            style={{minHeight: window.innerHeight - 50}}
        >
            <div className={classes.searchBox}>
                    <div className={classes.searchBox_content}>
                        <Input type={'text'} placeholder={'Найти...'}/>
                        <Button title={'Поиск'} variant={'contrast'}/>
                    </div>
            </div>
            <div className={classes.mainBox}>
                <div className={classes.mainBox_stats}>dfhdf</div>
                <div className={classes.mainBox_content}>
                    <div className={classes.mainBox_filter}>
                        <div className={classes.filterBlock}>
                            <h6 className={classes.filterBlock_name}>Оценка</h6>
                            <div className={classes.filter_option}>Общая оценка</div>
                            <div className={classes.filter_option}>Оценка научных достижений</div>
                            <div className={classes.filter_option}>Оценка творческих достижений</div>
                            <div className={classes.filter_option}>Оценка спортивных достижений</div>
                            <div className={classes.filter_option}>Оценка общественных достижений</div>
                        </div>
                        <div className={classes.filterBlock}>
                            <h6 className={classes.filterBlock_name}>Регион</h6>
                            <div className={classes.filter_option}>Новороссийск</div>
                            <div className={classes.filter_option}>Москва</div>
                        </div>
                    </div>
                    <div className={classes.mainBox_searchResults}>
                        {students.map(student =>
                            <div
                                className={classes.searchResult}
                                key={student.id}
                            >
                                <div className={classes.userInfo}>
                                    <img className={classes.userImg} src={student.img} alt={student.name}/>
                                    <div className={classes.userName}>
                                        {student.name} {student.lastName}
                                    </div>
                                    <div className={classes.userRating}>
                                        {student.rating}
                                    </div>
                                </div>
                                <div className={classes.userCertificates}>
                                    {certificates.map(certificate => 
                                        <div
                                            className={classes.certificate}
                                            key={certificate.id}
                                        >
                                            <img className={classes.certificateImg} src={certificate.img}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;