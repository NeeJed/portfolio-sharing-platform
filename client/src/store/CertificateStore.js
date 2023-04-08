import {createSlice} from '@reduxjs/toolkit';

const CertificateStore = createSlice({
    name: 'certificate',
    initialState: {
        _types: [
            {id: 1, name: 'Научные достижения'},
            {id: 2, name: 'Спортивные достижения'},
            {id: 3, name: 'Творческие достижения'},
            {id: 4, name: 'Общественные достижения'},
        ],
        _certificates: [
            {id: 1, name: 'Первое место. Траектория будущего 2022', img: ''},
            {id: 2, name: 'Я профессионал. Диплом призера 2021', img: ''},
            {id: 3, name: 'Диплом победителя в международных состязаниях по кикбоксингу', img: ''},
            {id: 4, name: 'Сертификат об авторском праве на произведение "Бу-бу-бу"', img: ''},
            {id: 5, name: 'Волонтёрский сертификат', img: ''},
        ]
    },
    reducers: {
        setTypes(state, action) {
            state._types = action.payload;
        },
        setCertificate(state, action) {
            state._certificates = action.payload;
        },
    },
});

export const {setTypes, setCertificate} = CertificateStore.actions;

export default CertificateStore.reducer;