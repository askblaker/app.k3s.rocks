import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const tryParse = (/** @type {string} */ key) => {
	if (browser) {
		const res = localStorage.getItem(key);
		if (res) {
			try {
				const parsed = JSON.parse(res);
				return parsed;
			} catch (e) {
				console.error(`${key} store error, clearing it`);
				localStorage.removeItem(key);
			}
		}
	}
	return undefined;
};

/**
 * @param {string} keyName
 * @param {Object[]} value
 */
const browserSaveArray = (keyName, value) => {
	if (browser) {
		localStorage.setItem(keyName, JSON.stringify(value));
	}
};

/**
 * @param {string} keyName
 * @param {string} kind
 */
const makeStore = (keyName, kind) => {
	let store = writable();
	if (kind == 'array') {
		store = writable(tryParse(keyName) || []);
	}
	if (kind == 'object') {
		store = writable(tryParse(keyName) || {});
	}
	if (store) {
		store.subscribe((value) => browserSaveArray(keyName, value));
	}
	return store;
};

/**
 * @param {string} keyName
 * @param {Object} value
 */

const sshkeyName = 'sshkeys';
export const SSHKeyStore = makeStore(sshkeyName, 'array');

const serverkeyName = 'servers';
export const ServersStore = makeStore(serverkeyName, 'array');

const settingskeyName = 'settings';
export const SettingsStore = makeStore(settingskeyName, 'object');

export const TerminalContentStore = writable(['']);
