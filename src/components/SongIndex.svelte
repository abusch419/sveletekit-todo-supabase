<script>
  import { onMount } from 'svelte';
  import { loadUserSongs, userSongs, timesSeen } from '../stores/songStore.js'
  import { user } from '../stores/authStore.js'
  import { Jellyfish } from 'svelte-loading-spinners'

  onMount(async () => {
    await loadUserSongs($user.id)
    // userSongs.forEach( async (userSong) => {
    //   const timesSeen = await timesSeen(userSong)
    // })
  })
</script>

<div class="container mx-auto my-6 max-w-lg">
  <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">My songs</h1>
  <ul class="text-center mt-5">
    {#if $userSongs.length > 0}
      {#each $userSongs as userSong}
        <li class="mt-4" style="text-transform: capitalize;">{userSong.name}
          {#await timesSeen(userSong, $user.id)}
            <div class="inline-block relative top-1">
              <Jellyfish size="25"/>
            </div>  
          {:then count}
            <span>({count} times)</span>
          {:catch error}
            <span style="color: red">{error.message}</span>
          {/await}
        </li>
      {/each}
    {:else}
    <p class="text-lg text-center text-gray-800 mt-4">
      Get started by selecting all of the shows you've attended 💃
    </p>
    {/if}
  </ul>
</div>