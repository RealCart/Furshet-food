import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    currentProfileWindow: 0,
    userInfoSuccessfulllyChanged: false,
    error: null,
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
        },
        openUserProfileModal: (state) => {
            state.isOpen = !state.isOpen;
            state.currentProfileWindow = 1;
        },
        openOrderHistoryModal: (state) => {
            state.isOpen = !state.isOpen;
            state.currentProfileWindow = 2;
        }        
    },
})

export const {toggleProfile, setProfileWindow, openUserProfileModal, openOrderHistoryModal} = profileSlice.actions;
export default profileSlice.reducer