import {createSlice} from '@reduxjs/toolkit';

const UserStore = createSlice({
    name: 'user',
    initialState: {
        _isAuth: false,
        _user: {},
        _userInfo: {},
        _userCertificates: [],
    },
    reducers: {
        setIsAuth(state, action) {
            state._isAuth = action.payload;
        },
        setUser(state, action) {
            state._user = action.payload;
        },
        setUserInfo(state, action) {
            state._userInfo = action.payload;
        },
        setUserCertificates(state, action) {
            state._userCertificates = action.payload;
        },
    },
});

export const {setIsAuth, setUser, setUserInfo, setUserCertificates} = UserStore.actions;

export default UserStore.reducer;