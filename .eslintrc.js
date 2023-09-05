module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'xo',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/stylistic',
    'prettier',
  ],
  ignorePatterns: ['dist/**/*.js', 'out/**/*.js'],
  overrides: [
    {
      env: {
        browser: true,
      },
      extends: ['xo/browser', 'plugin:react/recommended', 'plugin:jsx-a11y/strict', 'prettier'],
      plugins: ['react', 'jsx-a11y'],
      files: ['src/renderer/**/*.{tsx,*ts}'],
      rules: {
        'react/react-in-jsx-scope': 'off',
      },
    },
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.js',
        '.prettierrc.cjs',
        'forge.config.cjs',
        'jest.config.cjs',
        'postcss.config.cjs',
        'tailwind.config.cjs',
        'vite.main.config.cjs',
        'vite.preload.config.cjs',
        'vite.renderer.config.cjs',
        'src/main/**/*.{tsx,*ts}',
      ],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  globals: {
    JSX: 'readonly',
  },
  plugins: ['import', 'unicorn', '@typescript-eslint', 'prettier'],
  root: true,
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error', 'debug', 'table'] }],
    'unicorn/prefer-module': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
    'unicorn/prevent-abbreviations': [
      'warn',
      {
        replacements: {
          props: false,
          env: false,
        },
      },
    ],
  },
};
