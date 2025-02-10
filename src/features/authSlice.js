import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { validateSession, user, auth, verifyOtp } from "../constants/URLs";
import axios from '../axios';

export const sendPhoneNumber = createAsyncThunk(
    'phoneValidation', 
    async(phone, { rejectWithValue }) => {
        try {
            const response = await axios.post(auth, {phone: phone});
            console.log('Sucess phoneValidation: ', response);
            return phone;
        } catch (error) {
            return rejectWithValue(error.message);
        } finally {
            console.log({phone: phone});
        }
    }
);

export const verifyCode = createAsyncThunk(
    'verifyCode',
    async(sendData, {rejectWithValue}) => {
        try {
            const response = await axios.post(verifyOtp, sendData);
            console.log("Sucess verifyOtp: ", response);
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const validateSessionFunc = createAsyncThunk(
    'auth/validateSession',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(validateSession);
            console.log("Success: ", response);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUserFunc = createAsyncThunk(
    'user',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(user)
            console.log("Success user: ", response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    phoneModal: true,
    verifyCodeModal: false,
    userInfo: {
        userId: null,
        userName:null,
        userphone: null,
        userEmail: null,
        userInstagram: null,
        userBirthday: null,
        userBonus_points: null,
    },
    isLoading: false,
    isAuthenticated: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        phoneModal: (state) => {
            state.verifyCodeModal = false;
            state.phoneModal = true;
        },
        logout: (state) => {
            state.userData = null;
        },
    },
    extraReducers: (builder) => 
        builder
            .addCase(sendPhoneNumber.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendPhoneNumber.fulfilled, (state, action) => {
                state.isLoading = false;
                state.phoneModal = false;
                state.verifyCodeModal = true;
                state.userInfo = {...state.userInfo, userphone: action.payload}
            })
            .addCase(sendPhoneNumber.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(verifyCode.fulfilled, (state) => {
                state.isAuthenticated = true;
            })
            .addCase(verifyCode.rejected, (state, action) => {
                state.error = action.payload;
                state.isAuthenticated = false;
                state.userInfo = null;
            })
            .addCase(validateSessionFunc.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(validateSessionFunc.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(validateSessionFunc.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.userInfo = null;
                state.error = action.payload
            })
            .addCase(getUserFunc.fulfilled, (state, action) => {
                const {id, name, phone, email, instagram, birthday, bonus_points} = action.payload
                state.userInfo = {...state.userInfo, userId: id, userName: name, userphone: phone, userEmail: email, userInstagram: instagram, userBirthday: birthday, userBonus_points: bonus_points};
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(getUserFunc.rejected, (state, action) => {
                state.userInfo = null;
                state.error = action.payload
                state.isAuthenticated = false;
                state.isLoading = false;
            })
})

export const { phoneModal } = authSlice.actions;
export default authSlice.reducer;