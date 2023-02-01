<script>
	import ServerModal from '$lib/components/ServerModal.svelte';
	import Server from '$lib/components/Server.svelte';
	import { ServersStore } from '$lib/stores';

	/**
	 * @param {import('$lib/types').Server} server
	 */
	function addServer(server) {
		$ServersStore = [...$ServersStore, server];
	}

	/**
	 * @param {import('$lib/types').Server} server
	 */
	function updateServer(server) {
		const nodes = $ServersStore.map((/** @type {import('$lib/types').SSHKey} */ item) => {
			if (item.id === server.id) {
				return server;
			} else {
				return item;
			}
		});
		ServersStore.set(nodes);
	}

	function handleDelete(/** @type {string} */ id) {
		if ($ServersStore.length == 0) {
			return;
		}
		const nodes = $ServersStore.filter((/** @type {{ id: string; }} */ obj) => {
			return obj.id !== id;
		});
		ServersStore.set(nodes);
	}

	/**
	 * @param {import('$lib/types').Server} server
	 */
	function handleEdit(server) {
		selectedServer = server;
		editModalOpen = true;
	}

	let editModalOpen = false;
	/**
	 * @type {import('$lib/types').SSHKey | undefined}
	 */
	let selectedKey = undefined;
	const getNewBlankServer = () => {
		return {
			name: '',
			id: '',
			keyId: '',
			ip: '',
			port: '',
			password: '',
			username: '',
			useSSHKey: false
		};
	};

	/**
	 * @type {import('$lib/types').Server}
	 */
	let selectedServer;
</script>

<svelte:head>
	<title>SSH Keys | app.k3s.rocks</title>
</svelte:head>

{#if editModalOpen}
	<ServerModal
		bind:editModalOpen
		bind:activeServer={selectedServer}
		bind:selectedKey
		{addServer}
		{updateServer}
	/>
{/if}

<div class="pb-2">
	<button
		class="btn"
		on:click={() => {
			selectedServer = getNewBlankServer();
			editModalOpen = true;
		}}>Add</button
	>
</div>

<div class="h-96 w-full overflow-y-scroll">
	<ul>
		{#each $ServersStore as server}
			<Server
				data={server}
				onDelete={handleDelete}
				onEdit={() => {
					handleEdit(server);
				}}
			/>
		{/each}
	</ul>
</div>
