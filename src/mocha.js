const { TEST_PATTERNS } = require('./constants');

module.exports = {
	plugins: [
		'mocha',
		'chai-expect',
	],
	overrides: [
		// Overrides for Mocha & Chai.
		{
			files: TEST_PATTERNS,
			extends: [
				'plugin:chai-expect/recommended',
			],
			env: {
				mocha: true,
			},
			rules: {
				// Mocha uses `this` for context, so regular functions are recommended.
				'prefer-arrow-callback': 'off',
				'mocha/prefer-arrow-callback': 'error',
				'func-names': 'off',
				'no-invalid-this': 'off',

				// These are useful during development, but they should not be committed.
				'mocha/no-exclusive-tests': 'error',
				'mocha/no-skipped-tests': 'error',

				// Most reporters assume the descriptions follow a specific format, and sticking to this improves the
				// readability of the output.
				'mocha/valid-test-description': [
					'warn',
					'^should .*[^.]$',
				],

				// Prevent incorrect or confusing code.
				'mocha/handle-done-callback': 'error',
				'mocha/no-global-tests': 'warn',
				'mocha/no-identical-title': 'warn',
				'mocha/no-mocha-arrows': 'error',
				'mocha/no-nested-tests': 'error',
				'mocha/no-return-and-callback': 'error',
				'mocha/no-setup-in-describe': 'error',
				'mocha/no-sibling-hooks': 'warn',

				// This throws when doing assertions on mocks in some cases.
				'@typescript-eslint/unbound-method': 'off',

				// Chai likes using expressions that auto-evaluate, which this rule does not like.
				'no-unused-expressions': 'off',
				'@typescript-eslint/no-unused-expressions': 'off',

				// I don't _really_ care about documenting everything in the tests.
				'lines-between-class-members': 'off',
				'jsdoc/require-description': 'off',
				'jsdoc/require-description-complete-sentence': 'off',
				'jsdoc/require-example': 'off',
				'jsdoc/require-file-overview': 'off',
				'jsdoc/require-hyphen-before-param-description': 'off',
				'jsdoc/require-jsdoc': 'off',
				'jsdoc/require-param': 'off',
				'jsdoc/require-param-description': 'off',
				'jsdoc/require-param-name': 'off',
				'jsdoc/require-param-type': 'off',
				'jsdoc/require-property': 'off',
				'jsdoc/require-property-description': 'off',
				'jsdoc/require-property-name': 'off',
				'jsdoc/require-property-type': 'off',
				'jsdoc/require-returns': 'off',
				'jsdoc/require-returns-check': 'off',
				'jsdoc/require-returns-description': 'off',
				'jsdoc/require-returns-type': 'off',
			},
		},
	],
};
