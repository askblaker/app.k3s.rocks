<script>
	import { SettingsStore } from '$lib/stores';
	let themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter'
	];

	function handleThemeChange(e) {
		document.documentElement.setAttribute('data-theme', e.target.value ?? 'light');
	}
</script>

<div class="form-control w-full max-w-xs">
	<label for="Name" class="label">
		<span class="label-text">Email</span>
	</label>
	<input
		type="text"
		bind:value={$SettingsStore.email}
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
	/>
</div>

<div class="form-control w-full max-w-xs">
	<label for="Name" class="label">
		<span class="label-text">Domain</span>
	</label>
	<input
		type="text"
		bind:value={$SettingsStore.domain}
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
	/>
</div>

<label for="Theme" class="label">
	<span class="label-text">Theme</span>
</label>
<select
	class="select w-full max-w-xs"
	bind:value={$SettingsStore.theme}
	on:change={(e) => handleThemeChange(e)}
>
	{#each themes as theme}
		<option value={theme}>{theme}</option>
	{/each}
</select>
