<script>
  import { onMount } from 'svelte';
  import { loadUserSongs, userSongs } from '../stores/songStore.js'
  import { user } from '../stores/authStore.js'

  onMount(async () => {
    await loadUserSongs($user.id)
  })
</script>

<div class="container mx-auto my-6 max-w-lg">
  <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">My songs ({$userSongs.length})</h1>
  
  <ul class="text-center mt-5">
    {#if $userSongs.length > 0}
      {#each $userSongs as userSong}
        <li class="mt-1" style="text-transform: capitalize;">{userSong.name}
        <span>{userSong.timesSeen}</span>
        </li>
      {/each}
    {:else}
    <p class="text-lg text-center text-gray-800 mt-4">
      Get started by selecting all of the shows you've attended 💃
    </p>
    {/if}
  </ul>
</div>