import {createSlice} from '@reduxjs/toolkit';

const CertificateStore = createSlice({
    name: 'certificate',
    initialState: {
        _categories: [],
        _types: [],
        _ranks: [],
        _certificates: [
            {id: 1, name: 'Первое место. Траектория будущего 2022', img: ''},
            {id: 2, name: 'Я профессионал. Диплом призера 2021', img: ''},
            {id: 3, name: 'Диплом победителя в международных состязаниях по кикбоксингу', img: ''},
            {id: 4, name: 'Сертификат об авторском праве на произведение "Бу-бу-бу"', img: ''},
            {id: 5, name: 'Волонтёрский сертификат', img: ''},
        ],
    },
    reducers: {
        setCategories(state, action) {
            state._categories = action.payload;
        },
        setTypes(state, action) {
            state._types = action.payload;
        },
        setRanks(state, action) {
            state._ranks = action.payload;
        },
        setCertificates(state, action) {
            state._certificates = action.payload;
        },
    },
});

export const {setCategories, setTypes, setRanks, setCertificates,} = CertificateStore.actions;

export default CertificateStore.reducer;