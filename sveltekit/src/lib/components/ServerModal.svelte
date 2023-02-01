<script>
	import { browser } from '$app/environment';
	import { SSHKeyStore } from '$lib/stores';
	export let editModalOpen = false;

	/**
	 * @param {import('$lib/types').Server} server
	 */
	export let addServer = (server) => {
		console.error('addServer not implemented!');
	};

	/**
	 * @param {import('$lib/types').Server} server
	 */
	export let updateServer = (server) => {
		console.error('updateserver not implemented!');
	};

	/**
	 * @type {import('$lib/types').Server}
	 */
	export let activeServer = {
		name: '',
		id: '',
		ip: '',
		port: '',
		keyId: '',
		username: '',
		password: '',
		useSSHKey: false
	};

	function closeModal() {
		editModalOpen = false;
	}

	/**
	 *
	 * @param {any} e
	 */
	function handleKeyPress(e) {
		if (e.key == 'Escape') {
			closeModal();
		}
	}

	/**@arg {string} id*/
	function getSshKeyFromId(id) {
		const key = $SSHKeyStore.find((/** @type {import('$lib/types').Server}*/ item) => {
			if (item.id == id) {
				return item;
			}
		});
		return key;
	}

	/**
	 * @type {import('$lib/types').SSHKey | undefined}
	 */
	export let selectedKey = undefined;

	if (browser && activeServer?.keyId) {
		selectedKey = getSshKeyFromId(activeServer.keyId);
	}

	$: activeServer.keyId = selectedKey?.id;
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
		<h3 class="font-bold text-lg text">Server</h3>

		<div class="form-control w-full">
			<label for="name" class="label">
				<span class="label-text">Name</span>
			</label>
			<input type="text" class="input input-bordered" bind:value={activeServer.name} />

			<label for="ip" class="label">
				<span class="label-text">ip</span>
			</label>
			<input type="text" class="input input-bordered" bind:value={activeServer.ip} />

			<label for="port" class="label">
				<span class="label-text">port</span>
			</label>
			<input type="text" class="input input-bordered" bind:value={activeServer.port} />

			<label for="username" class="label">
				<span class="label-text">username</span>
			</label>
			<input type="text" class="input input-bordered" bind:value={activeServer.username} />

			<label for="password" class="label">
				<span class="label-text">password</span>
			</label>
			<input type="text" class="input input-bordered" bind:value={activeServer.password} />

			<label for="usesshkey" class="label">
				<span class="label-text">Use key</span>
			</label>
			<label class="label cursor-pointer">
				<input type="checkbox" class="toggle" bind:checked={activeServer.useSSHKey} />
			</label>

			<label for="sshkey" class="label">
				<span class="label-text">SSHKey</span>
			</label>
			<select bind:value={selectedKey} class="select w-full max-w-xs">
				<option value={{ id: '', name: '', key: '' }}> No Key </option>
				{#each $SSHKeyStore as sshkey}
					<option value={sshkey}> {sshkey.name} </option>
				{/each}
			</select>
			{activeServer.id}

			<div class="modal-action">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				{#if activeServer.id != ''}
					<label
						for="my-modal-5"
						class="btn"
						on:click={() => {
							updateServer(activeServer);
							closeModal();
						}}>Update</label
					>
				{:else}
					<label
						for="my-modal-5"
						class="btn"
						on:click={() => {
							activeServer.id = Math.random().toString();
							addServer(activeServer);
							closeModal();
						}}>Add</label
					>
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
