<script>
	import { page } from '$app/stores';
	/**
	 * @type {string}
	 */
	export let href;
	/**
	 * @type {string}
	 */
	export let text;
</script>

<li class="p-1">
	<a {href} class:active={$page.url.href.includes(href)}>{text}</a>
</li>
