import { createContext, useReducer } from 'react'
import notificationReducer, { reset, setNotification } from '../reducers/notificationReducer'
import { useContext } from 'react'
import { StatusTypes } from '../components/Notifications'
import { SetNotification } from '../reducers/actions/notificationActions'


const NotificationContext = createContext()

const initialState = {
  message: undefined,
  status: StatusTypes.INFO
}

export const NotificationContextProvider = (props) => {
  const [notifications, notificationsDispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={[notifications, notificationsDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationsContext = () => {
  const [notifications, dispatch] = useContext(NotificationContext)

  const setNotificationAction = (payload) => {
    SetNotification(payload)(dispatch)
  }
  return [notifications, setNotificationAction]
}