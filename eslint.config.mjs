// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    //tseslint.configs.strictTypeChecked,
    //tseslint.configs.stylisticTypeChecked,
    tseslint.configs.strict,
    tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['**/*.ts'],
        ignores: ['dist/**'],
        rules: {
            semi: ['error', 'always'],
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'prefer-const': 'off',
        },
    },
);
