import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import config_prettier from 'eslint-config-prettier'
import plugin_onlyWarn from 'eslint-plugin-only-warn'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

/** @type {import('eslint').Linter.Config[]} */
const config = [
  config_prettier,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      onlyWarn: plugin_onlyWarn,
    },
    rules: {
      // disable some strict typescript rules
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off',
      // custom rules
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
      'eqeqeq': 'warn',
    },
  },
  {
    ignores: ['dist/**', 'out/**', 'node_modules/**', '.next/**'],
  },
]

export default config
