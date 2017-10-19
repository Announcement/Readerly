module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },

  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },

  extends: [
    'standard',
    'prettier',
    'prettier/standard'
  ],

  plugins: [
    'prettier',
    'standard'
  ],

  rules: {
    'complexity': ['warn', { max: 2 }],
    'consistent-return': 'error',
    'global-require': 'error',
    'no-duplicate-imports': ['error', {'includeExports': true}],
    'max-depth': ['warn', 3],
    'max-len': ['error', { code: 80, ignoreComments: true, ignoreRegExpLiterals: true }],
    'max-nested-callbacks': ['error', { max: 3 }],
    'max-params': ['warn', { max: 3 }],
    'no-duplicate-imports': 'off',
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'vars-on-top': ['warn'],
    'space-before-function-paren': ['error', 'always']
  }
}
