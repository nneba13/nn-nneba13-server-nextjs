
import { describe, test, expect, vi, beforeAll, beforeEach, afterAll } from 'vitest';

import { getConfiguration, getEnvValue, toAppEnv, validateEnv } from './core';

//==================================================================================================

describe('configuration', function () {
	let configuration;

	beforeAll(function () {
		vi.stubEnv('NEXT_PUBLIC_BASE_URL', 'https://www.test.com');
		vi.stubEnv('NEXT_PUBLIC_FIREBASE', 'eyJhcHBJZCI6IkZCX0FQUF9JRCIsInByb2plY3RJZCI6IkZCX1BST0pFQ1RfSUQiLCJhcGlLZXkiOiJGQl9BUElfS0VZIiwiYXV0aERvbWFpbiI6IkZCX0FVVEhfRE9NQUlOIiwibWVhc3VyZW1lbnRJZCI6IkZCX01FQVNVUkVNRU5UX0lEIiwibWVzc2FnaW5nU2VuZGVySWQiOiJGQl9NRVNTQUdJTkdfU0VOREVSX0lEIiwic3RvcmFnZUJ1Y2tldCI6IkZCX1NUT1JBR0VfQlVDS0VUIn0=');
		vi.stubEnv('NEXT_PUBLIC_PREDICABLE', 'predicable');
	});

	beforeEach(function () {
		configuration = getConfiguration();
	});

	afterAll(function () {
		vi.unstubAllEnvs();
	});

	describe('function getConfiguration', function () {
		test('should get the configuration', function () {
			expect(configuration).toEqual({
				env: 'test',
				domain: {
					scheme: 'https',
					host: 'www.test.com'
				}
			});
		});
	});

	describe('function getEnvValue', function () {
		test('should get the environment value "PREDICABLE"', function () {
			const value = getEnvValue('NEXT_PUBLIC_PREDICABLE');
			expect(value).toBe('predicable');
		});

		test('should resolve values without prefix "NEXT_PUBLIC_"', function () {
			const value = getEnvValue('NEXT_PUBLIC_PREDICABLE');
			expect(value).toBe('predicable');
		});
	});

	describe('function toAppEnv', function () {
		test('should convert value to tAppEnv value', function () {
			const value1 = toAppEnv('production');
			const value2 = toAppEnv('development');
			const value3 = toAppEnv('test');
			const value4 = toAppEnv('random');
			const value5 = toAppEnv(1234);
			expect(value1).toBe('production');
			expect(value2).toBe('development');
			expect(value3).toBe('test');
			expect(value4).toBe('production');
			expect(value5).toBe('production');
		});
	});

	describe('function validateEnv', function () {
		test('should validate the environment value without strictness', function () {
			expect(validateEnv('production')).toBe(false);
			expect(validateEnv('development')).toBe(false);
			expect(validateEnv('test')).toBe(true);
		});

		test('should validate the environment value with strictness', function () {
			expect(function () { validateEnv('production', true); }).toThrow('environment-constraint');
			expect(function () { validateEnv('development', true); }).toThrow('environment-constraint');
			expect(function () { validateEnv('test', true); }).not.toThrow('environment-constraint');
		});
	});
});
