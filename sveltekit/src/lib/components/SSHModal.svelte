<script>
	export let editModalOpen = false;

	/**
	 * @param {import('$lib/types').SSHKey} key
	 */
	export let addKey = (key) => {
		console.error('addKey not implemented!');
	};

	/**
	 * @param {import('$lib/types').SSHKey} key
	 */
	export let updateKey = (key) => {
		console.error('updateKey not implemented!');
	};
	export let name = '';
	export let key = '';
	export let id = '';

	function closeModal() {
		editModalOpen = false;
	}

	function handleUpdate() {
		updateKey({ id, name, key });
		closeModal();
	}

	function handleAdd() {
		addKey({ name, key, id: Math.random().toString() });
		closeModal();
	}

	/**
	 * @param {{ key: string; keyCode: number; ctrlKey: any; }} e
	 */
	function handleKeyPress(e) {
		if (e.key == 'Escape') {
			closeModal();
		}

		if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
			if (id == '') {
				handleUpdate();
			} else {
				handleAdd();
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeyPress} />

<div class="fixed inset-0 w-full h-full flex justify-center items-center bg-neutral opacity-90" />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="fixed inset-0 w-full h-full flex justify-center items-center" on:click={closeModal}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="bg-accent rounded-md px-8 py-10 relative w-full max-w-lg"
		id="modal-body"
		on:click|stopPropagation
	>
		<button class="btn btn-sm btn-circle absolute right-2 top-2" on:click={closeModal}>✕</button>
		<h3 class="font-bold text-lg text">SSH Key</h3>
		<div class="form-control w-full">
			<label for="name" class="label">
				<span class="label-text">Name</span>
			</label>
			<input type="text" class="input input-bordered" bind:value={name} />
			<label for="key" class="label">
				<span class="label-text">Key</span>
			</label>
			<textarea class="textarea textarea-bordered h-24" bind:value={key} />
			<div class="modal-action">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				{#if id != ''}
					<label for="my-modal-5" class="btn" on:click={handleUpdate}>Update</label>
				{:else}
					<label for="my-modal-5" class="btn" on:click={handleAdd}>Add</label>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	span {
		color: hsl(var(--ac));
	}

	.text {
		color: hsl(var(--ac));
	}
</style>
