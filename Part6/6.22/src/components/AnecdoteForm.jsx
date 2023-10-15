import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AnecdoteService } from "../services/AnecdoteService"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const createAnecdote = useMutation({
    mutationFn: (anecdote) => AnecdoteService.create(anecdote),
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    createAnecdote.mutateAsync({
      content,
      id: crypto.randomUUID(),
      votes: 0
    })
    .then((response) => {
      event.target.anecdote.value = ''
      queryClient.refetchQueries(['anecdotes'])
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
