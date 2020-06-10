module.exports = {
    env: {
        node: true,
        browser: true,
    },
    root: true,
    parser: '@typescript-eslint/parser', // the TypeScript parser we installed earlier
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-module-boundary-types': [
            'warn',
            {allowedNames: ['constructor']},
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'all',
                ignoreRestSiblings: false,
                argsIgnorePattern: '^_',
            },
        ],
    },
    overrides: [
        {
            files: [
                'next.config.js',
                '.postcssrc.js',
                '.eslintrc.js',
                '.prettierrc.js',
            ],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
    globals: {
        React: 'writable',
    },
};
