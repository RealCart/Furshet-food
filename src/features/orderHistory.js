import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import axios from "../axios";
import { userOrderHistory } from "../constants/URLs";

export const getUserHistory = createAsyncThunk(
    'getUserHistory',
    async(_, {rejectWithValue}) => {
        try {
            const response = await axios.get(userOrderHistory);
            console.log("Successfully user history: ", response);
            return response.data;
        } catch (error) {
            console.log("Error while fetching history: ", error);
            return rejectWithValue(error);
        }
    }
)

const initialState = {
    isLoading: false,
    userHistory: [],
    isError: null,
};

const orderHistory = createSlice({
    name: "orderHistory",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUserHistory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserHistory.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.userHistory = [...state.userHistory, data];
                state.isLoading = false;
            })
            .addCase(getUserHistory.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    }
})

export default orderHistory.reducer;