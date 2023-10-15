import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AnecdoteService } from "../services/AnecdoteService"
import { StatusTypes } from "./Notifications"
import { useNotificationsContext } from "../contexts/NotificationContext"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const createAnecdote = useMutation({
    mutationFn: (anecdote) => AnecdoteService.create(anecdote),
  })
  const [notifications, setNotification] = useNotificationsContext()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    createAnecdote.mutateAsync({
      content,
      id: crypto.randomUUID(),
      votes: 0
    })
    .then((response) => {
      setNotification({ message: `Successfully Created ${event.target.anecdote.value}`, status: StatusTypes.SUCCESS })
      queryClient.refetchQueries(['anecdotes'])
      event.target.anecdote.value = ''
    })
    .catch((error) => {
      setNotification({ message: error.response.data.error, status: StatusTypes.ERROR })
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
