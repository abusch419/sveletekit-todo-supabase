<script>
	import { toggleBelongsToUser } from '../stores/eventStore.js';
	import { events } from '../stores/eventStore.js';
	import { loadEvents } from '../stores/eventStore.js';
	import { eventIdsBelongingToUser } from '../stores/eventStore.js';
	import { user } from '../stores/authStore.js';
	import { onMount } from 'svelte';
	import { eventLabel } from '../stores/eventStore.js';

	const handleChecked = (event_id) => {
		toggleBelongsToUser(event_id, $user.id);
	};

	let shows = [];
	let userEventIds = [];

	onMount(async () => {
		await loadEvents();
		userEventIds = await eventIdsBelongingToUser($user.id);

		const checkboxes = document.querySelectorAll(['#event-checkbox']);
		checkboxes.forEach((checkbox) => {
			const eventId = parseInt(checkbox.dataset.eventId);
			if (userEventIds.includes(eventId)) {
				checkbox.checked = true;
			} else {
				checkbox.checked = false;
			}
		});
	});
</script>

<div class="container mx-auto my-6 max-w-lg text-center">
	<h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">
		Add Or Remove Shows From Your Collection
	</h1>
	<form class="my-6">
		<div class="flex flex-col text-sm mb-2">
			{#each $events as show}
			<label style="text-transform: capitalize;" class="font-bold mb-2 text-gray-800" for="event-checkbox">
				<input class="mt-1 mr-1" id="event-checkbox" type="checkbox" bind:group={shows}
					on:click={handleChecked(show.id)} value={JSON.stringify(show)} data-event-id={show.id} />
				{eventLabel(show)}
			</label>
			{/each}
		</div>
	</form>
</div>