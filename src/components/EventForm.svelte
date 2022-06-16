<script>
  import {addEvent} from '../stores/eventStore.js'
  import { events } from "../stores/eventStore.js"
  import {eventsBelongingToUser} from "../stores/eventStore.js"
  import { user } from "../stores/authStore.js"
  import {loadEvents} from "../stores/eventStore.js"
  import { onMount } from 'svelte';
  
  const handleChecked = (event_id) => {
    addEvent(event_id, $user.id)
  }

  const eventLabel = (event) => {
    return `${event.date} ${event.city}, ${event.state.toUpperCase()}`
  }

  let shows = []
  let userEventIds = []

  onMount(async () => {
    await loadEvents()
    console.log('top of onMount')
    userEventIds = await eventsBelongingToUser($user.id)
    console.log("got userEventIds" + userEventIds)

    const checkboxes = document.querySelectorAll(['#event-checkbox'])
    console.log('got checkboxes' + checkboxes)
    console.log("about to start forEach loop")
    checkboxes.forEach((checkbox) => {
      console.log("in the loop")
      const eventId = parseInt(checkbox.dataset.eventId)
      if (userEventIds.includes(eventId)) {
        console.log('found a match for event: ' + eventId)
        checkbox.checked = true
      } else {
        console.log('no match for event: ' + eventId)
        checkbox.checked = false
      }
    })
	});
  

</script>

<form class="my-6">
  <div class="flex flex-col text-sm mb-2">
    { #each $events as show }
      <label style="text-transform: capitalize;" class="font-bold mb-2 text-gray-800" for="event-checkbox">{eventLabel(show)}
        <input class="float-left mt-1 mr-1" id='event-checkbox' type="checkbox" bind:group={shows} on:click={handleChecked(show.id)} value={JSON.stringify(show)} data-event-id={show.id}>
      </label>
    {/each}
  </div>
</form>