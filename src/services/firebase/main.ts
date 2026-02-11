
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

//==================================================================================================

const ERROR_FIREBASE_INITIALIZATION_FAILURE = 'firebase-initialization-failed';
const ERROR_FIREBASE_APP_UNDEFINED = 'firebase-app-undefined';
const ERROR_FIREBASE_ANALYTICS_UNDEFINED = 'firebase-analytics-undefined';

let _fbApp: ReturnType<typeof initializeApp> | undefined;
let _fbAnalytics: ReturnType<typeof getAnalytics> | undefined;

//==================================================================================================

export function initFirebaseApp (configuration?: string) {
	try {
		if (!configuration) return;

		if (!_fbApp) {
			/**
			 * Firebase Configuration
			 *
			 * @example
			 * {
			 *    appId: '···',
			 *    projectId: '···',
			 *    apiKey: '···',
			 *    authDomain: '···',
			 *    measurementId: '···',
			 *    messagingSenderId: '···',
			 *    storageBucket: '···'
			 * }
			 */
			const fbc = JSON.parse(atob(configuration));
			_fbApp = initializeApp(fbc);
		}

		if (!_fbAnalytics) {
			_fbAnalytics = getAnalytics(_fbApp);
		}
	} catch (ex: unknown) {
		console.error(ERROR_FIREBASE_INITIALIZATION_FAILURE);
		throw ex;
	}

	return _fbApp;
}

export function getFirebaseApp () {
	if (!_fbApp) throw Error(ERROR_FIREBASE_APP_UNDEFINED);
	return _fbApp;
}

export function getFirebaseAnalytics () {
	if (!_fbAnalytics) throw Error(ERROR_FIREBASE_ANALYTICS_UNDEFINED);
	return _fbAnalytics;
}
