import { manifests } from '$lib/getManifests';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	return {
		manifests
	};
}
