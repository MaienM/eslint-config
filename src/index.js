const extendsCallbacks = require('eslint-extends-callbacks');

module.exports = extendsCallbacks({
	parser: 'babel-eslint',
	extends: [
		'plugin:promise/recommended',
		'plugin:jsdoc/recommended',
		'airbnb',
		'plugin:eslint-comments/recommended',
	],
	plugins: [
		'eslint-comments',
		'filenames',
		'jsdoc',
		'promise',
		'unicorn',
	],
	// The comments starting with # refer to the anchor in the documentation. Searching for the text after the # should yield the description/rationale/examples for the rule.
	rules: {
		/**
		 * Deviations from airbnb.
		 */

		// #airbnb-indent
		'no-tabs': 'off',
		indent: (severity, indentStyle, ...rest) => [severity, 'tab', ...rest],
		'react/jsx-indent': (severity, indentStyle, ...rest) => [severity, 'tab', ...rest],
		'react/jsx-indent-props': (severity, indentStyle, ...rest) => [severity, 'tab', ...rest],

		// #airbnb-max-len
		'max-len': (severity, length, tabSize, options, ...rest) => [
			severity,
			120,
			4,
			{
				...options,
				ignoreComments: true,
			},
			...rest,
		],

		/**
		 * Additional rules.
		 */

		// #maienm-empty-lines
		'no-multiple-empty-lines': (severity, options, ...rest) => [
			severity,
			{
				...options,
				max: 1,
			},
			...rest,
		],

		// #maienm-import-order
		'import/order': ['error', {
			groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
			'newlines-between': 'never',
			alphabetize: {
				order: 'asc',
				caseInsensitive: true,
			},
		}],

		// #maienm-require-jsdoc
		'jsdoc/check-access': ['warn', {
			baseConfig: {
				indent: ['warn', 2],
			},
		}],
		'jsdoc/require-description-complete-sentence': 'warn',
		'jsdoc/require-description': 'warn',
		'jsdoc/require-hyphen-before-param-description': ['warn', 'never'],
		'jsdoc/require-jsdoc': ['warn', {
			require: {
				ArrowFunctionExpression: true,
				ClassDeclaration: true,
				FunctionDeclaration: true,
				FunctionExpression: true,
				MethodDefinition: true,
			},
		}],

		/**
		 * Stuff that isn't mentioned in the README.
		 *
		 * There are a few possible reasons for this:
		 *
		 * - The adjustment here fixes (what I would consider to be) a false positive. That is, there are cases that don't
		 *   violate the actual rule as described in the airbnb spec, but that do result in ESLint errors.
		 * - The rule comes from one of the other inherited configs above.
		 * - They add checks that are about correctness, not style. There's no real reason that I can think of to discuss
		 *   these, so I see no value in documenting them in the README.
		 * - I forgot, or just couldn't be bothered.
		 */

		// Avoid excessive complexity.
		complexity: ['error', 20],

		// The rule is fine in principle, but I've encountered too many situations where I couldn't actually control this,
		// so it leads to too many ignores. An example of this is a subclass, where you don't just get to decide a method
		// is now static just because your implementation doesn't use `this`.
		'class-methods-use-this': 'off',

		// There is no reason to define a function that uses `this` in a scope where `this` has no meaning.
		'no-invalid-this': 'error',

		// Unnecessary eslint-disable comments should just be cleaned up.
		'eslint-comments/no-unused-disable': 'warn',

		// These are already handled by other plugins
		'unicorn/filename-case': 'off',
		'unicorn/no-abusive-eslint-disable': 'off',
	},
	settings: {
		jsdoc: {
			tagNamePreference: {
				augments: 'extends',
				public: 'access public',
				private: 'access private',
				protected: 'access protected',
				package: 'access package',
			},
		},
	},
});
