<script>
  import TodoForm from '../components/TodoForm.svelte'
  import Todo from '../components/Todo.svelte'
  import { todos } from "../stores/todoStore.js"
  import EventForm from '../components/EventForm.svelte'
</script>

<main>
  <!-- <TodoForm />
  {#each $todos as todo}
    <Todo todo={todo} />
  {/each} -->
  <EventForm />
</main>