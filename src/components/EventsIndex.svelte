<script>
  import { userEvents, eventLabel, loadEventsBelongingToUser } from '../stores/eventStore.js'
  import { user } from '../stores/authStore.js'
  import { onMount } from 'svelte'

  onMount(async () => {
    await loadEventsBelongingToUser($user.id)
  })
</script>

<div class="container mx-auto my-6 max-w-lg">
  <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">My shows</h1>
  <ul class="text-center mt-5">
    {#if $userEvents.length > 0}
    {#each $userEvents as userEvent}
    <li style="text-transform: capitalize;">{eventLabel(userEvent)}</li>
    {/each}
    {:else}
    <p class="text-lg text-center text-gray-800 mt-4">
      Get started by selecting all of the shows you've attended 💃
    </p>
    {/if}
  </ul>
</div>