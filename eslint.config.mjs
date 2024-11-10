import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu({
  rules: { 'no-console': ['warn'] },
}, tailwind.configs['flat/recommended'])
