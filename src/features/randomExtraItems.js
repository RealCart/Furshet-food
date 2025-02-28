import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    randomItems: [],
};

const randomExtraItems = createSlice({
    name: 'randomExtraItems',
    initialState,
    reducers: {
        setRandomItems: (state, action) => {
            state.randomItems = action.payload;
        }
    }
});

export const { setRandomItems } = randomExtraItems.actions;
export default randomExtraItems.reducer;
