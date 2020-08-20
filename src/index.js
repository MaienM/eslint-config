// eslint-disable-next-line @typescript-eslint/no-var-requires
const extendsCallbacks = require('eslint-extends-callbacks');

let typescript = false;
try {
	// eslint-disable-next-line global-require, import/no-extraneous-dependencies
	require('typescript');
	typescript = true;
} catch {
	// Typescript not present, so don't setup rules for it.
}

/* eslint-disable jsdoc/require-jsdoc */
module.exports = extendsCallbacks({
	parser: 'babel-eslint',
	extends: [
		'plugin:promise/recommended',
		'plugin:jsdoc/recommended',
		...(typescript ? [
			'plugin:@typescript-eslint/eslint-recommended',
			'plugin:@typescript-eslint/recommended',
		] : []),
		'airbnb',
		'plugin:eslint-comments/recommended',
	],
	plugins: [
		...(typescript ? ['@typescript-eslint'] : []),
		'chai-expect',
		'eslint-comments',
		'filenames',
		'jsdoc',
		'mocha',
		'promise',
		'require-jsdoc-except',
		'unicorn',
	],
	// The comments starting with # refer to the anchor in the documentation. Searching for the text after the # should yield the description/rationale/examples for the rule.
	rules: {
		/**
		 * Deviations from airbnb.
		 */

		// #airbnb-indent
		'no-tabs': 'off',
		indent: (severity, _indentStyle, ...rest) => [severity, 'tab', ...rest],
		'react/jsx-indent': (severity, _indentStyle, ...rest) => [severity, 'tab', ...rest],
		'react/jsx-indent-props': (severity, _indentStyle, ...rest) => [severity, 'tab', ...rest],

		// #airbnb-max-len
		'max-len': (severity, _length, _tabSize, options, ...rest) => [
			severity,
			120,
			4,
			{
				...options,
				ignoreComments: true,
			},
			...rest,
		],

		'no-else-return': 'off',

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
		'jsdoc/require-description': ['warn', {
			checkGetters: false,
			checkSetters: false,
		}],
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
		 * React rules.
		 */

		// #maienm-react-callback-names
		'react/jsx-handler-names': 'warn',

		// #maienm-react-conditional-jsx
		'react/jsx-wrap-multilines': ['warn', {
			declaration: 'parens-new-line',
			assignment: 'parens-new-line',
			return: 'parens-new-line',
			arrow: 'parens-new-line',
			condition: 'parens-new-line',
			logical: 'parens-new-line',
			prop: 'parens-new-line',
		}],

		// #maienm-react-destructure-state
		'react/destructuring-assignment': ['warn', 'always'],

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

		// These are already handled by other plugins.
		'unicorn/filename-case': 'off',
		'unicorn/no-abusive-eslint-disable': 'off',

		// Typescript compatibility.
		'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
		'import/extensions': (severity, type_, options) => [severity, type_, {
			...options,
			ts: 'never',
			tsx: 'never',
		}],

		// It might be desireable to mention arguments that are part of an implememented interface, even if they are not
		// used in that specific implementation.
		'@typescript-eslint/no-unused-vars': ['error', {
			vars: 'all',
			args: 'after-used',
			argsIgnorePattern: '^_',
			ignoreRestSiblings: true,
		}],
		'no-underscore-dangle': 'off',
	},
	overrides: [
		// Overrides for React.
		{
			files: ['**/*.jsx', '**/*.tsx'],
			rules: {
				// #maienm-react-jsdoc
				'require-jsdoc-except/require-jsdoc': ['warn', {
					require: {
						ArrowFunctionExpression: true,
						ClassDeclaration: true,
						FunctionDeclaration: true,
						FunctionExpression: true,
						MethodDefinition: true,
					},
					ignore: [
						'constructor',
						// Well-known React methods.
						'render',
						'componentDidCatch',
						'componentDidMount',
						'componentDidUpdate',
						'componentWillUnmount',
						'getDerivedStateFromError',
						'getDerivedStateFromProps',
						'getSnapshotBeforeUpdate',
						'shouldComponentUpdate',
						// Callback handlers. Sometimes useful, sometimes not.
						'/^handle.*/',
						// Material-ui styling.
						'styles',
					],
				}],
				'jsdoc/require-jsdoc': 'off',

				'jsdoc/require-returns': 'off',
			},
		},
		// Overrides for Typescript.
		{
			parser: '@typescript-eslint/parser',
			files: ['**/*.ts', '**/*.tsx'],
			rules: {
				// TypeScript is already specific about the types, no need to repeat this.
				'jsdoc/require-param-type': 'off',
				'jsdoc/require-property-type': 'off',
				'jsdoc/require-returns-type': 'off',

				// The base eslint rule complains about optional chaining, so use the typescript one.
				'no-unused-expressions': 'off',
				'@typescript-eslint/no-unused-expressions': ['warn', {
					allowShortCircuit: false,
					allowTernary: false,
					allowTaggedTemplates: false,
				}],
			},
		},
		// Overrides for Mocha & Chai.
		{
			files: ['test/**/*.ts', 'test/**/*.js', '**/*.spec.ts', '**/*.spec.js'],
			extends: [
				'plugin:chai-expect/recommended',
			],
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
		'import/resolver': {
			node: {
				extensions: [
					'.js',
					'.jsx',
					'.json',
					'.ts',
					'.tsx',
				],
			},
		},
		'import/extensions': [
			'.js',
			'.mjs',
			'.jsx',
			'.ts',
			'.tsx',
		],
	},
});
/* eslint-enable jsdoc/require-jsdoc */
