import { createSlice } from "@reduxjs/toolkit";

const LocationStore = createSlice({
    name: 'location',
    initialState: {
        regions: [],
        cities: [],
    },
    reducers: {
        setRegions(state, action) {
            state.regions = action.payload;
        },
        setCities(state, action) {
            state.cities = action.payload;
        }
    },
})

export const {setRegions, setCities} = LocationStore.actions;

export default LocationStore.reducer;