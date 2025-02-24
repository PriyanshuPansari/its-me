// lint-staged.config.js
module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  'src/**/*.{json,md,mdx}': ['prettier --write']
}
