
const ERROR_ENVIRONMENT_CONSTRAINT = 'environment-constraint';

/**
 * Available app environments.
 */
export const ENV_DEVELOPMENT = 'development' as const;
export const ENV_PRODUCTION = 'production' as const;
export const ENV_TEST = 'test' as const;


//| Configuration |=================================================================================

export type tAppConfiguration = {
	env: tAppEnv;
	domain: tAppDomain;
};

type tAppDomain = {
	scheme: string;
	host: string;
	port?: number;
};

/**
 * App's static configuration
 */
let _configuration: tAppConfiguration | undefined;

/**
 * Gets the app's configuration.
 * @returns {tAppConfiguration}
 */
export function getConfiguration () {
	if (!_configuration) {
		_configuration = configure();
	}

	return _configuration;
}

/**
 * Creates the app's configuration data.
 * @returns {tAppConfiguration}
 */
function configure () {
	const ENV = toAppEnv(process.env.NODE_ENV);

	let BASE_URL: string;
	if ((typeof window) === 'object') {
		BASE_URL = window.location.href;
	} else {
		BASE_URL = String(process.env.NEXT_PUBLIC_BASE_URL);
	}

	const base = new URL(BASE_URL);

	const domain: Partial<tAppDomain> = {
		scheme: base.protocol.replace(/[^A-Za-z]+$/, ''),
		host: base.hostname,
	};

	if (base.port) {
		domain.port = Number(base.port);
	}

	const configuration: tAppConfiguration = Object.freeze({
		env: ENV,
		domain: Object.freeze(domain as tAppDomain)
	});

	return configuration;
}


//| Environment |===================================================================================

/**
 * Defines the app's environment.
 */
export type tAppEnv = (typeof ENV_PRODUCTION) | (typeof ENV_DEVELOPMENT) | (typeof ENV_TEST);

/**
 * Gets the app's environment value.
 * @returns {unknown}
 */
export function getEnvValue (key: string, strict: boolean = false) {
	const value = process.env[key] ?? process.env[`NEXT_PUBLIC_${key}`];
	if (strict && value == null) throw Error(ERROR_ENVIRONMENT_CONSTRAINT);
	return value ?? undefined;
}

/**
 * Convert value to app environment.
 * @param value
 * @returns {string}
 */
export function toAppEnv (value: unknown) {
	let env = value != null ? value.toString() : 'production';
	// @ts-expect-error 'Argument of type `string` is not assignable to parameter of type...'
	if (![ENV_PRODUCTION, ENV_DEVELOPMENT, ENV_TEST].includes(env)) env = 'production';
	return env as tAppEnv;
}

/**
 * Checks the specified environment against the app's environment. If the check fails and the strict
 * is true then an exception is thrown, otherwise a boolean value is returned.
 * @param env
 * @param strict
 * @returns {boolean}
 */
export function validateEnv (env: tAppEnv, strict?: boolean) {
	const currentEnv = _configuration?.env ?? '';
	const envComparison = currentEnv === env;
	if (strict && !envComparison) throw Error(`${ERROR_ENVIRONMENT_CONSTRAINT}|${env}`);
	return envComparison;
}
