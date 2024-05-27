module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'standard-jsx'],
  rules: {
    'comma-dangle': 'off',
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'never' }],
    'no-template-curly-in-string': ['warn'],
    camelcase: 0,
  },
}
