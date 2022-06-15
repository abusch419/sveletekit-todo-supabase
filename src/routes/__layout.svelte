<script>
  import { supabase } from "../supabase.js";
  import { user } from "../stores/authStore.js"
  import { loadTodos } from "../stores/todoStore.js"
  import Navbar from "../components/Navbar.svelte"

  import Auth from '../components/Auth.svelte'
  import "../app.css"

  console.log(supabase.auth.user())
  user.set(supabase.auth.user())

  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session?.user)
    if (session?.user) {
      loadTodos()
    }
  })
</script>

<div class="container mx-auto my-6 max-w-lg">
  {#if $user}
    <Navbar/>
    <slot></slot>
  {:else}
    <Auth />
  {/if}
</div>