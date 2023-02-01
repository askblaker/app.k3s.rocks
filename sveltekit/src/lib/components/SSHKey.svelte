<script>
	/** @type {import('$lib/types').SSHKey} */
	export let data;
	export let onDelete = (/** @type {string} */ input) => {
		console.error(`onDelete not implemented!`);
		return;
	};
	export let onEdit = () => {
		console.error('onEdit not implemented!');
		return;
	};
</script>

<div class="grid grid-cols-3 h-14 w-full items-center rounded-md px-4 selec">
	<div>
		{data.name || ''}
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
