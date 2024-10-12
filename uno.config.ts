import { defineConfig, transformerVariantGroup } from 'unocss'

export default defineConfig({
  transformers: [transformerVariantGroup()],
  shortcuts: [
    {
      container: 'mx-auto max-w-screen-xl px-5 md:px-10',
    },
  ],
})
