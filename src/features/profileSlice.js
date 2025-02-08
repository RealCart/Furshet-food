import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    currentProfileWindow: 0,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        toggleProfile: (state) => {
            state.isOpen = !state.isOpen;
            state.currentProfileWindow = 0;
        },
        setProfileWindow: (state, action) => {
            const {indexOfPage} = action.payload;
            state.currentProfileWindow = indexOfPage;
        }
    }
})

export const {toggleProfile, setProfileWindow} = profileSlice.actions;
export default profileSlice.reducer