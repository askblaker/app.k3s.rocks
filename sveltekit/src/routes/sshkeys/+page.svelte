<script>
	import SSHModal from '$lib/components/SSHModal.svelte';
	import SSHKey from '$lib/components/SSHKey.svelte';
	import { SSHKeyStore } from '$lib/stores';

	/**
	 * @param {import('$lib/types').SSHKey} key
	 */
	function addKey(key) {
		$SSHKeyStore = [...$SSHKeyStore, key];
	}

	/**
	 * @param {import('$lib/types').SSHKey} key
	 */
	function updateKey(key) {
		const nodes = $SSHKeyStore.map((/** @type {import('$lib/types').SSHKey} */ item) => {
			if (item.id === key.id) {
				return key;
			} else {
				return item;
			}
		});
		SSHKeyStore.set(nodes);
	}

	function handleDelete(/** @type {string} */ id) {
		if ($SSHKeyStore.length == 0) {
			return;
		}
		const nodes = $SSHKeyStore.filter((/** @type {{ id: string; }} */ obj) => {
			return obj.id !== id;
		});
		SSHKeyStore.set(nodes);
	}

	/**
	 * @param {import('$lib/types').SSHKey} key
	 */
	function handleEdit(key) {
		selectedKey = key;
		editModalOpen = true;
	}

	let editModalOpen = false;
	let selectedKey = { id: '', name: '', key: '' };
</script>

<svelte:head>
	<title>SSH Keys | app.k3s.rocks</title>
</svelte:head>

{#if editModalOpen}
	<SSHModal
		bind:editModalOpen
		name={selectedKey.name}
		id={selectedKey.id}
		key={selectedKey.key}
		{addKey}
		{updateKey}
	/>
{/if}

<div class="pb-2">
	<button
		class="btn"
		on:click={() => {
			/*
			addKey({
				name: 'name-' + Math.random().toString(),
				key: 'key-' + +Math.random().toString(),
				id: 'id-' + Math.random().toString()
			});
			*/
			editModalOpen = true;
		}}>Add</button
	>
</div>

<div class="h-96 w-full overflow-y-scroll">
	<ul>
		{#each $SSHKeyStore as sshkey}
			<SSHKey
				data={sshkey}
				onDelete={handleDelete}
				onEdit={() => {
					handleEdit(sshkey);
				}}
			/>
		{/each}
	</ul>
</div>
