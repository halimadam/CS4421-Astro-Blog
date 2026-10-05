import eslint from '@eslint/js';
import astro from 'eslint-plugin-astro';
import typescript from 'typescript-eslint';

export default [
	{
		ignores: ['dist/**', '.astro/**', 'node_modules/**', 'cdk/**'],
	},
	eslint.configs.recommended,
	...astro.configs['flat/recommended'],
	{
		files: ['**/*.astro'],
		languageOptions: {
			parserOptions: {
				parser: typescript.parser,
			},
		},
	},
];
