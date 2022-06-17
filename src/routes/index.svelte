<script>
  import EventForm from '../components/EventForm.svelte'
  import { userEvents } from '../stores/eventStore.js'
</script>

<main>
  <EventForm />
  <!-- <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">My shows</h1>
  <ul>
    {#if $userEvents.length > 0}
    {#each $userEvents as userEvent}
    <li style="text-transform: capitalize;">{eventLabel(userEvent)}</li>
    {/each}
    {:else}
    <p class="text-lg text-center text-gray-800 mt-4">
      Get started by selecting all of the shows you've attended 💃
    </p>
    {/if}
  </ul> -->
</main>