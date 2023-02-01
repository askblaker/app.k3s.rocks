<script>
	import { ServersStore, SettingsStore, TerminalContentStore } from '$lib/stores';
	import { apiCall } from '$lib/apiCall';

	/** @type {import('./$types').PageData} */
	export let data;

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

	/**
	 * @type {Object<string,string>}
	 */
	let vars = {};

	/**@type {{text:string, json: Object, name:string } | undefined} */
	let selectedManifest = undefined;
	let yamlLines = [''];
	$: {
		if (selectedManifest) {
			yamlLines = selectedManifest.text.split('\n');
			getVars();
		}
	}

	function getVars() {
		yamlLines.forEach((line) => {
			if (line.includes('${')) {
				const substring = line.substring(line.indexOf('${') + 2, line.lastIndexOf('}'));
				vars[substring] = '';
				vars = { ...vars };
			}
		});
	}

	function createManifest() {
		let man = '';
		yamlLines.forEach((line) => {
			if (line.includes('${')) {
				const substring = line.substring(line.indexOf('${') + 2, line.lastIndexOf('}'));
				const newLine = line.split('${')[0] + vars[substring] + '\n';
				man += newLine;
			} else {
				man += line + '\n';
			}
		});
		return man;
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

<label for="app" class="label">
	<span class="label-text">App</span>
</label>
<select
	class="select"
	bind:value={selectedManifest}
	on:change={() => {
		vars = {};
	}}
>
	{#each data.manifests as manifest}
		<option value={manifest}>{manifest.name}</option>
	{/each}
</select>

<div class="pb-2">
	Vars:
	{#each Object.entries(vars) as [key]}
		<div class="flex p-2">
			<input
				type="text"
				placeholder="type value"
				class="input input-bordered"
				bind:value={vars[key]}
			/>
			<label for={key} class="label">
				<span class="label-text">{key}</span>
			</label>
		</div>
	{/each}
</div>
<button
	class="btn btn-primary"
	on:click={() => {
		apiCall({
			command: `echo '${createManifest()}' | kubectl apply -f - `,
			selectedServer
		});
	}}>Apply</button
>

<button
	class="btn btn-primary"
	on:click={() => {
		alert(createManifest());
	}}>Show</button
>

<style>
	.line {
		color: hsl(var(--ac));
	}
</style>
