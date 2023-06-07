import {createSlice} from '@reduxjs/toolkit';

const UserStore = createSlice({
    name: 'user',
    initialState: {
        _isAuth: false,
        _user: {},
        _userInfo: {},
        _userCity: '',
        _userRegion: '',
        _userEducationalStage: {},
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
        setUserCity(state, action) {
            state._userCity = action.payload;
        },
        setUserRegion(state, action) {
            state._userRegion = action.payload;
        },
        setUserEducationalStage(state, action) {
            state._userEducationalStage = action.payload;
        },
    },
});

export const {setIsAuth, setUser, setUserInfo, setUserCertificates, setUserCity, setUserRegion, setUserEducationalStage} = UserStore.actions;

export default UserStore.reducer;