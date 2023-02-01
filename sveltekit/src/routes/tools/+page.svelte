<script>
	import { ServersStore, SettingsStore, TerminalContentStore } from '$lib/stores';
	import { commands } from '$lib/commands';
	import { apiCall } from '$lib/apiCall';

	/**
	 * @type { import('$lib/types').Server | undefined }
	 */
	let selectedServer = undefined;
	if ($SettingsStore) {
		if ($SettingsStore.selectedServerId) {
			if ($ServersStore) {
				selectedServer = $ServersStore.find(
					(/** @type { import('$lib/types').Server } */ element) =>
						element.id == $SettingsStore.selectedServerId
				);
			}
		}
	}

	$: {
		if (selectedServer) {
			$SettingsStore.selectedServerId = selectedServer.id;
		}
	}
</script>

<div class="form-control w-full pb-2">
	<label for="port" class="label">
		<span class="label-text">Server</span>
	</label>
	<select class="select select-bordered w-full max-w-xs" bind:value={selectedServer}>
		{#each $ServersStore as server}
			<option value={server}>{server.name}</option>
		{/each}
	</select>

	<label for="terminal" class="label">
		<span class="label-text">Terminal</span>
	</label>
	<div class="w-full h-64 bg-accent overflow-y-scroll resize-y flex flex-col-reverse">
		<div>
			{#each $TerminalContentStore as line}
				<div class="line">{line}</div>
			{/each}
		</div>
	</div>
</div>

<button class="btn btn-secondary" on:click={() => apiCall({ command: commands.ls, selectedServer })}
	>ls</button
>
<button
	class="btn btn-secondary"
	on:click={() => apiCall({ command: commands.install, selectedServer })}>update</button
>
<button
	class="btn btn-primary"
	on:click={() => apiCall({ command: commands.installK3s, selectedServer })}
	>Install k3s Master</button
>

<style>
	.line {
		color: hsl(var(--ac));
	}
</style>
