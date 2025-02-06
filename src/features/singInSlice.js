import { createSlice } from "@reduxjs/toolkit";

const singInSlice = createSlice({
    name: 'singIn',
    initialState: {
        isSingInOpen: false,
    },
    reducers: {
        openSingInModal: (state) => {
            state.isSingInOpen = true;
        },
        closeSingInModal: (state) => {
            state.isSingInOpen = false;
        }
    }
})


export const { openSingInModal, closeSingInModal} = singInSlice.actions
export default singInSlice.reducer