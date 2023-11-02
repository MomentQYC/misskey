/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { miLocalStorage } from '@/local-storage.js';

const address = new URL(location.href);
const siteName = document.querySelector<HTMLMetaElement>('meta[property="og:site_name"]')?.content;

export const hostname = address.hostname;
export const url = address.origin;
export const apiUrl = url + '/api';

export let host;
export let instanceName;

fetch(apiUrl + '/meta', {
	method: 'POST',
	body: JSON.stringify({ detail: false }),
	headers: {
		'Content-Type': 'application/json'
	}
}).then( response => {
	return response.json();
} ).then( res => {
	const data = res.uri;
	host = data.replace(/^https?:\/\//, '');
	instanceName = siteName === 'Misskey' ? host : siteName;
} );
export const wsUrl = url.replace('http://', 'ws://').replace('https://', 'wss://') + '/streaming';
export const lang = miLocalStorage.getItem('lang') ?? 'en-US';
export const langs = _LANGS_;
const preParseLocale = miLocalStorage.getItem('locale');
export let locale = preParseLocale ? JSON.parse(preParseLocale) : null;
export const version = _VERSION_;
export const ui = miLocalStorage.getItem('ui');
export const debug = miLocalStorage.getItem('debug') === 'true';

export function updateLocale(newLocale): void {
	locale = newLocale;
}
