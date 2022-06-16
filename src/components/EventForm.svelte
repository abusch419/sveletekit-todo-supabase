<script>
  import {addEvent} from '../stores/eventStore.js'
  import { events } from "../stores/eventStore.js"
  import {userEventBridgeIsPresentForEvent} from "../stores/eventStore"
  import { user } from "../stores/authStore.js"
  
  const handleChecked = (event_id) => {
    addEvent(event_id, $user.id)
  }

  const eventLabel = (event) => {
    return `${event.date} ${event.city}, ${event.state.toUpperCase()}`
  }

  const checked = async (event_id) => {
    console.log(await userEventBridgeIsPresentForEvent(event_id, $user.id))
    return await userEventBridgeIsPresentForEvent(event_id, $user.id)
  }
</script>

<form class="my-6">
  <div class="flex flex-col text-sm mb-2">
    { #each $events as event }
      <label style="text-transform: capitalize;" class="font-bold mb-2 text-gray-800" for="event">{eventLabel(event)}</label>
      <input type="checkbox" value={checked(event.id)} on:click|preventDefault={handleChecked(event.id)}>
    {/each}
  </div>
</form>