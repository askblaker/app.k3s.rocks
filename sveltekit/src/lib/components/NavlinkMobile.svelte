<script>
	import { page } from '$app/stores';
	export let handleClick = (/** @type {string} */ _) => {};

	/**
	 * @type {string}
	 */
	export let text;
	/**
	 * @type {string}
	 */
	export let href;
</script>

<button
	class="btn my-2"
	on:click={() => handleClick(href)}
	class:btn-primary={$page.url.href.includes(href)}
>
	{text}
</button>
