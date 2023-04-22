import {createSlice} from '@reduxjs/toolkit';

const StudentsStore = createSlice({
    name: 'students',
    initialState: {
        _students: [],
    },
    reducers: {
        setStudents(state, action) {
            state._students = action.payload;
        },
    },
});

export const {setStudents} = StudentsStore.actions;

export default StudentsStore.reducer;