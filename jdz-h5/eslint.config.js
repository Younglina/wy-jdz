// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  extends: [
    './.eslintrc-auto-import.json',
  ],
})