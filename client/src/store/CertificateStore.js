import {createSlice} from '@reduxjs/toolkit';

const CertificateStore = createSlice({
    name: 'certificate',
    initialState: {
        _categories: [],
        _types: [],
        _ranks: [],
        _certificates: [],
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