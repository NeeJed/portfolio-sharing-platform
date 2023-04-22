import {createSlice} from '@reduxjs/toolkit';

const CertificateStore = createSlice({
    name: 'certificate',
    initialState: {
        _types: [],
        _certificates: [
            {id: 1, name: 'Первое место. Траектория будущего 2022', img: ''},
            {id: 2, name: 'Я профессионал. Диплом призера 2021', img: ''},
            {id: 3, name: 'Диплом победителя в международных состязаниях по кикбоксингу', img: ''},
            {id: 4, name: 'Сертификат об авторском праве на произведение "Бу-бу-бу"', img: ''},
            {id: 5, name: 'Волонтёрский сертификат', img: ''},
        ],
        _ranks: [
            {id: 1, name: 'Международный'},
            {id: 2, name: 'Всероссийский'},
            {id: 3, name: 'Региональный'},
            {id: 4, name: 'Муниципальный'},
            {id: 5, name: 'Университетский'},
            {id: 6, name: 'Школьный'},
        ],
    },
    reducers: {
        setTypes(state, action) {
            state._types = action.payload;
        },
        setRanks(state, action) {
            state._ranks = action.payload;
        },
        setCertificate(state, action) {
            state._certificates = action.payload;
        },
    },
});

export const {setTypes, setCertificate, setRanks} = CertificateStore.actions;

export default CertificateStore.reducer;