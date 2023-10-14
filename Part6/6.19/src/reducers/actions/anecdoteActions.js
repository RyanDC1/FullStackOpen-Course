import { StatusTypes } from "../../components/Notifications"
import { AnecdoteService } from "../../services/AnecdoteService"
import { add, update, updateById } from "../anecdoteReducer"
import { SetNotification } from "./notificationActions"


export const InitializeAnecdotes = () => {
    return async dispatch => {
        return AnecdoteService.get()
        .then((response) => {
            dispatch(update(response))
        })
        .catch((error) => {
            console.error(error)
            dispatch(SetNotification({
                message: `An error occurred while fetching`,
                status: StatusTypes.ERROR
            }))
        })
    }
}

export const CreateAnecdote = (anecdote) => {
    return async dispatch => {
        return AnecdoteService.create({
            content: anecdote,
            id: crypto.randomUUID(),
            votes: 0
        })
        .then((response) => {
            dispatch(add(response))
        })
        .catch((error) => {
            console.error(error)
            dispatch(SetNotification({
                message: `An error occurred while creating`,
                status: StatusTypes.ERROR
            }))
        })
    }
}

export const UpdateAnecdote = (anecdote) => {
    return async dispatch => {
        return AnecdoteService.update(anecdote.id, {
            ...anecdote,
            votes: anecdote.votes + 1
        })
        .then((response) => {
            dispatch(updateById(response))
            dispatch(SetNotification({
                message: `you voted ${anecdote.content}`
            }))
        })
        .catch((error) => {
            console.error(error)
            dispatch(SetNotification({
                message: `An error occurred while updating`,
                status: StatusTypes.ERROR
            }))
        })
    }
}