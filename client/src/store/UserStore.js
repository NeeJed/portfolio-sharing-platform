import {createSlice} from '@reduxjs/toolkit';

const UserStore = createSlice({
    name: 'user',
    initialState: {
        _isAuth: false,
        _user: {
            name: 'den'
        },
    },
    reducers: {
        setIsAuth(state, action) {
            state._isAuth = action.payload;
        },
        setUser(state, action) {
            state._user = action.payload;
        },
    },
});

export const {setIsAuth, setUser} = UserStore.actions;

export default UserStore.reducer;