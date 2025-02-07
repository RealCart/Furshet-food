import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFoodInfoOpen: false,
    itemId: null,
}

const foodInfo = createSlice({
    name: 'foodInfo',
    initialState,
    reducers :{
        openFood: (state, actions) => {
            const {foodId} = actions.payload;
            state.isFoodInfoOpen = true;
            state.itemId = foodId;
        },
        closeFood: (state) => {
            state.isFoodInfoOpen = false;
            state.itemId = null;
        }
    }
})

export const { openFood, closeFood } = foodInfo.actions;
export default foodInfo.reducer;