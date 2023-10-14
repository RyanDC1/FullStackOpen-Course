import { StatusTypes } from "../../components/Notifications"
import { reset, setNotification } from "../notificationReducer"

export const SetNotification = ({ message, status = StatusTypes.INFO, timeout = 5000 }) => {
    return async dispatch => {
        dispatch(setNotification({
            message,
            status
        }))

        setTimeout(() => {
            dispatch(reset())
        }, timeout);
    }
}