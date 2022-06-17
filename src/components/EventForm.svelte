<script>
	import { toggleBelongsToUser } from '../stores/eventStore.js';
	import { events } from '../stores/eventStore.js';
	import { loadEvents } from '../stores/eventStore.js';
	// import { userEvents } from '../stores/eventStore.js';
	// import { loadEventsBelongingToUser } from '../stores/eventStore.js';
	import { eventIdsBelongingToUser } from '../stores/eventStore.js';
	import { user } from '../stores/authStore.js';
	import { onMount } from 'svelte';
	import { eventLabel } from '../stores/eventStore.js';

	const handleChecked = (event_id) => {
		toggleBelongsToUser(event_id, $user.id);
	};

	// const eventLabel = (event) => {
	// 	return `${event.date} ${event.city}, ${event.state.toUpperCase()}`;
	// };

	let shows = [];
	let userEventIds = [];

	onMount(async () => {
		await loadEvents();
		// await loadEventsBelongingToUser($user.id);
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

<h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">
	Add Or Remove Shows From Your Collection
</h1>
<form class="my-6">
	<div class="flex flex-col text-sm mb-2">
		{#each $events as show}
			<label
				style="text-transform: capitalize;"
				class="font-bold mb-2 text-gray-800"
				for="event-checkbox"
				>{eventLabel(show)}
				<input
					class="float-left mt-1 mr-1"
					id="event-checkbox"
					type="checkbox"
					bind:group={shows}
					on:click={handleChecked(show.id)}
					value={JSON.stringify(show)}
					data-event-id={show.id}
				/>
			</label>
		{/each}
	</div>
</form>

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

<h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl mt-10">
	Check out those visuals bro
</h1>
<h2>This is where we'll show some charts</h2>
<h2>Idea: Compare stats with friends!</h2>
