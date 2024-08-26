module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    parser: "@babel/eslint-parser", // Sostituito babel-eslint con @babel/eslint-parser
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        requireConfigFile: false, // Non richiede un file di configurazione Babel
        babelOptions: {
            presets: ["@babel/preset-react"], // Specifica il preset di Babel
        },
    },
    plugins: [
        'react',
    ],
    rules: {
        // Puoi aggiungere o modificare le regole qui
    },
};
