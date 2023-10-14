import { createSlice } from "@reduxjs/toolkit";
import { StatusTypes } from "../components/Notifications";

const initialState = {
    message: undefined,
    status: StatusTypes.INFO
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification (state, action) {
            return {
                message: action.payload.message,
                status: action.payload.status
            }
        },

        reset (state, action) {
            return initialState
        }
    }
})

export default notificationSlice.reducer
export const { reset, setNotification } = notificationSlice.actions