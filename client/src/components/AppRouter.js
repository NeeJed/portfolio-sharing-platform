import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { START_ROUTE } from '../utils/consts';
import { authRoutes, publicRoutes } from '../routes';
import {useDispatch, useSelector} from 'react-redux';

const AppRouter = () => {
    // const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    console.log(user._isAuth);
    return (
        <Routes>
            {user._isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path='*' element={<Navigate to={START_ROUTE}/>}/>
        </Routes>
    )
}

export default AppRouter;