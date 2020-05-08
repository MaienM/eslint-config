const extendsCallbacks = require('eslint-extends-callbacks');

module.exports = extendsCallbacks({
	parser: 'babel-eslint',
	extends: [
		'plugin:promise/recommended',
		'plugin:jsdoc/recommended',
		'airbnb',
		'plugin:eslint-comments/recommended',
		'plugin:chai-expect/recommended',
		'plugin:chai-friendly/recommended',
	],
	plugins: [
		'chai-expect',
		'chai-friendly',
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
		'import/extensions': (severity, _type, options) => [severity, _type, {
			...options,
			ts: 'never',
			tsx: 'never',
		}],
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
						'render',
						'componentDidCatch',
						'componentDidMount',
						'componentDidUpdate',
						'componentWillUnmount',
						'getDerivedStateFromError',
						'getDerivedStateFromProps',
						'getSnapshotBeforeUpdate',
						'shouldComponentUpdate',
					],
				}],
			},
		},
		// Overrides for Typescript.
		{
			files: ['**/*.ts', '**/*.tsx'],
			rules: {
				// TypeScript is already specific about the types, no need to repeat this.
				'jsdoc/require-param-type': 'off',
				'jsdoc/require-property-type': 'off',
				'jsdoc/require-returns-type': 'off',
			},
		},
		// Overrides for Mocha & Chai.
		{
			files: ['test/**/*.ts', 'test/**/*.js', '**/*.spec.ts', '**/*.spec.js'],
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
