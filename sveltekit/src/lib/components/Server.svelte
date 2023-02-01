<script>
	/** @type {import('$lib/types').Server} */
	export let data;

	/** @param {string} input */
	export let onDelete = (input) => {
		console.error(`onDelete not implemented!`);
		return;
	};
	export let onEdit = () => {
		console.error('onEdit not implemented!');
		return;
	};

	let hoveringIp = false;
</script>

<div class="grid grid-cols-4 border-2 h-14 w-full items-center rounded-md px-4 selec">
	<div>
		{data.name || 'name'}
	</div>

	<div
		class="flex"
		on:mouseenter={() => {
			hoveringIp = !hoveringIp;
		}}
		on:mouseleave={() => {
			hoveringIp = !hoveringIp;
		}}
	>
		<div>
			{data.ip || 'ip'}
		</div>
		{#if hoveringIp}
			<button
				class="pl-2"
				on:click={() => {
					navigator.clipboard.writeText(data.ip);
				}}>Copy</button
			>
		{/if}
	</div>

	<div>
		<button
			class="btn btn-primary"
			on:click={() => {
				onEdit();
			}}>Edit</button
		>
	</div>

	<div>
		<button class="btn btn-secondary" on:click={() => onDelete(data.id)}>Delete</button>
	</div>
</div>

<style>
	.selec {
		border-width: 2px;
		border-color: rgba(0, 0, 0, 0);
	}

	.selec:hover {
		border-color: hsl(var(--p));
	}
</style>
