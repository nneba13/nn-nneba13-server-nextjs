
export function isBrowserContext () {
	return (typeof window) !== 'undefined';
}

export function isConnectionSecure () {
	return isBrowserContext() && window.isSecureContext;
}
