<script>
  import { supabase } from "../supabase.js";
  import { user } from "../stores/authStore.js"
  // import { loadTodos } from "../stores/todoStore.js"
  // import { loadEvents } from "../stores/eventStore.js"
  import Navbar from "../components/Navbar.svelte"

  import Auth from '../components/Auth.svelte'
  import "../app.css"

  user.set(supabase.auth.user())

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event)
    user.set(session?.user)
    if (session?.user) {
      // console.log("user is signed in")
      // loadTodos()
      // loadEvents()
    }
  })
</script>

<div class="container mx-auto my-6 max-w-lg">
  {#if $user}
  <Navbar />
  <slot></slot>
  {:else}
  <Auth />
  {/if}
</div>