<script>
  import { supabase } from '../supabase.js'
  const logOut = () => {
    console.log("logging out")
    supabase.auth.signOut()
  }
</script>

<div class="my-4 flex justify-end">
  <button class="shadow-sm bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-4" type="button"
    on:click={logOut}>Log out</button>
</div>