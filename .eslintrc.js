module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  plugins: [
    'jsdoc',
    'import',
    'ramda',
    'vue'
  ],
  overrides: [
    {
      files: [
        '*.vue'
      ],
      rules: {
        'sort-keys': 'off'
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'sort-keys': ['error', 'asc', {
      caseSensitive: false,
      natural: true
    }]
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
}
