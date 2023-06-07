import {createSlice} from '@reduxjs/toolkit';

const StudentsStore = createSlice({
    name: 'students',
    initialState: {
        _students: [],
        _educationalStages: [],
        _page: 1,
        _totalResults: 0,
        _limit: 5,
        _selectedCategories: [],
        _selectedTypes: [],
        _selectedRanks: [],
        _selectedEducationalStages: [],
    },
    reducers: {
        setStudents(state, action) {
            state._students = action.payload;
        },
        setEducationalStages(state, action) {
            state._educationalStages = action.payload;
        },
        setPage(state, action) {
            state._page = action.payload;
        },
        setTotalResults(state, action) {
            state._totalResults = action.payload;
        },
        setLimit(state, action) {
            state._limit = action.payload;
        },
        setSelectedCategories(state, action) {
            const newCategories = check(state._selectedCategories, action.payload)
            state._selectedCategories = [...newCategories]
            console.log('Выбранные категории: ', state._selectedCategories)
        },
        setSelectedTypes(state, action) {
            const newTypes = check(state._selectedTypes, action.payload)
            state._selectedTypes = [...newTypes]
            console.log('Выбранные типы: ', state._selectedTypes)
        },
        setSelectedRanks(state, action) {
            const newRanks = check(state._selectedRanks, action.payload)
            state._selectedRanks = [...newRanks]
            console.log('Выбранные уровни: ', state._selectedRanks)
        },
        setSelectedEducationalStages(state, action) {
            const newEducationalStages = check(state._selectedEducationalStages, action.payload)
            state._selectedEducationalStages = [...newEducationalStages]
            console.log('Выбранные уровни образования: ', state._selectedEducationalStages)
        },
    },
});

const check = (state, payload) => {
    if (state.includes(payload)) {
        state = [...state.filter(item => item !== payload)]
    } else {
        state = [...state, payload]
    }
    return state
}

export const {setStudents, setPage, setTotalResults, setLimit, setSelectedCategories, setSelectedTypes, setSelectedRanks, setEducationalStages, setSelectedEducationalStages} = StudentsStore.actions;

export default StudentsStore.reducer;