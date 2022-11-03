export default {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.jsx', '.vue', '.json'],
      },
    },
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
      ],
    }],
    'no-console': (() => {
      if (typeof process.env.NODE_ENV === 'undefined') {
        return 'off';
      }

      if (process.env.NODE_ENV === 'development') {
        return 'off';
      }

      return 'warn';
    })(),
    'no-debugger': (() => {
      if (typeof process.env.NODE_ENV === 'undefined') {
        return 'off';
      }

      if (process.env.NODE_ENV === 'development') {
        return 'off';
      }

      return 'warn';
    })(),
    'max-len': 'off',
    'no-async-promise-executor': 'off',
  },
};
