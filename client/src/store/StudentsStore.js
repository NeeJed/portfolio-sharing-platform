import {createSlice} from '@reduxjs/toolkit';

const StudentsStore = createSlice({
    name: 'students',
    initialState: {
        _students: [
            {id: 1, name: 'Jayson', lastName: 'Born', img: '', rating: '184'},
            {id: 2, name: 'Nick', lastName: 'Chaze', img: '', rating: '176'},
            {id: 3, name: 'Harisson', lastName: 'Lays', img: '', rating: '152'},
        ]
    },
    reducers: {
        setStudents(state, action) {
            state._students = action.payload;
        },
    },
});

export const {setStudents} = StudentsStore.actions;

export default StudentsStore.reducer;