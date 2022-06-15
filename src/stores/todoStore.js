import { writable } from "svelte/store";
import { supabase } from "../supabase.js"

export const todos = writable([]);

export const name = writable('Svelte')

export const loadTodos = async () => {
  const { data, error } = await supabase.from('todos').select()
  if (error) {
    return console.error(error)
  }

  todos.set(data)
}

export const addTodo = async (text, user_id) => {
  const { data, error } = await supabase.from('todos').insert([{ text, completed: false, user_id }])
  if (error) {
    return console.error(error)
  }

  todos.update((current) => [...current, data[0]])
}


export const deleteTodo = async (id) => {
  const { error } = await supabase.from('todos').delete().match({ id })

  if (error) {
    return console.error(error)
  }

  todos.update(todos => todos.filter((todo) => todo.id !== id))
}

export const toggleToDoCompleted = async (id, currentState) => {
  const { error } = await supabase.from('todos').update({ completed: !currentState }).match({ id })

  if (error) {
    return console.error(error)
  }

  todos.update(todos => {
    todos.forEach(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
    })
    return todos
  })
}