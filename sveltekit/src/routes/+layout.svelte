<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { SettingsStore } from '$lib/stores';

	import Navlink from '$lib/components/Navlink.svelte';
	import NavlinkMobile from '$lib/components/NavlinkMobile.svelte';
	import '../app.css';

	let mobileNavbarOpen = false;

	function handleClick(/** @type {string | URL} */ route) {
		mobileNavbarOpen = false;
		goto(route);
	}

	function openMobileNavbar() {
		mobileNavbarOpen = true;
	}
	if (browser) {
		document.documentElement.setAttribute('data-theme', $SettingsStore.theme ?? 'dark');
		if (!$SettingsStore.theme) {
			$SettingsStore.theme = 'dark';
		}
	}
	let menuLinks = [
		{ link: '/sshkeys', text: 'SSH Keys' },
		{ link: '/servers', text: 'Servers' },
		{ link: '/tools', text: 'Tools' },
		{ link: '/apps', text: 'Apps' },
		{ link: '/settings', text: 'Settings' }
	];
</script>

<!-- Drawer -->
<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={mobileNavbarOpen} />
	<div class="drawer-content">
		<!-- Page content here -->
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300">
			<div class="flex-none md:hidden">
				<button class="btn btn-square btn-ghost" on:click={openMobileNavbar}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					>
				</button>
			</div>
			<a href={$page.url.origin} class="flex-1 px-2 mx-2">app.k3s.rocks</a>
		</div>

		<div class="flex flex-row">
			<ul class="menu p-4 w-48 bg-base-100 text-base-content hidden md:block">
				<!-- Sidebar content here -->
				{#each menuLinks as menuLink}
					<Navlink href={menuLink.link} text={menuLink.text} />
				{/each}
			</ul>

			<div class="p-4 w-full">
				<slot />
			</div>
		</div>
	</div>
	<div class="drawer-side">
		<label for="my-drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-100 text-base-content">
			<!-- Drawer content here -->
			{#each menuLinks as menuLink}
				<NavlinkMobile href={menuLink.link} text={menuLink.text} {handleClick} />
			{/each}
		</ul>
	</div>
</div>
