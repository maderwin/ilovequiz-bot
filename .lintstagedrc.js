module.exports = {
    '*.{js,ts,jsx,tsx}': ['npm run lint-fix'],
    'src/{client,common}/**/*.{js,ts,jsx,tsx}': [
        () => 'npm run type-check-client',
    ],
    'src/{server,common}/**/*.{js,ts}': [() => 'npm run type-check-server'],
    '*.{js,jsx,ts,tsx,md,html,css,json}': ['npm run prettify'],
};
