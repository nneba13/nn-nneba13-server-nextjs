
import { join } from 'path';
import { defineConfig } from 'vitest/config';

import PACKAGE_JSON from './package.json';

//==================================================================================================

export default defineConfig(function () {
	const PACKAGE_KEY = PACKAGE_JSON.name;
	const BASE_FOLDER = import.meta.dirname;

	return {
		test: {
			name: PACKAGE_KEY,
			watch: false,
			globals: true,
			environment: 'node',
			include: ['{src,tests}/**/*.{test,spec}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
			reporters: ['verbose'],
			coverage: {
				reportsDirectory: join(BASE_FOLDER, '_cos_/coverage', PACKAGE_KEY),
				provider: 'v8'
			}
		}
	};
});
