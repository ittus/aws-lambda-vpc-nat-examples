// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  plugins: [],
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-useless-constructor': 0,
    'no-extra-bind': 1,
    'handle-callback-err': 1,
    'prefer-promise-reject-errors': 1,
    'space-before-function-paren': 0
  }
}
