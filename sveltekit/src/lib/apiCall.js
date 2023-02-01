import { get } from 'svelte/store';
import { SSHKeyStore, TerminalContentStore } from './stores';

/**
 *
 * @param {{selectedServer: import('$lib/types').Server | undefined, command: string}} options
 */
export async function apiCall(options) {
	if (!options.selectedServer) {
		alert('Error, no server selected!');
		return;
	}

	let key = undefined;

	if (options.selectedServer.useSSHKey && options.selectedServer.keyId) {
		key = get(SSHKeyStore).find(
			(/** @type { import('$lib/types').SSHKey} */ item) =>
				item.id == options?.selectedServer?.keyId
		);

		if (!key) {
			alert('Use key selected, but key not found, check server settings');
			return;
		}
	}

	const res = await fetch('api/ssh', {
		method: 'POST',
		body: JSON.stringify({
			command: options.command,
			host: options.selectedServer.ip,
			port: options.selectedServer.port,
			username: options.selectedServer.username,
			password: options.selectedServer.password,
			useKey: options.selectedServer.useSSHKey,
			sshKey: key ? key.key : undefined
		}),
		headers: {
			'content-type': 'application/json'
		}
	});
	const reader = res.body?.getReader();
	const decoder = new TextDecoder('utf-8');
	let done = false;
	let value = null;
	while (!done) {
		if (reader) {
			({ value, done } = await reader.read());
			const decodedValue = decoder.decode(value).split(/\n/);
			TerminalContentStore.update((n) => [...n, ...decodedValue]);
		}
	}
}
