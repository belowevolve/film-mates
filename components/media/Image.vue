<script lang="ts" setup>
defineProps<{
  src?: string | null
  alt?: string
}>()
</script>

<template>
  <div class="relative">
    <slot name="additional" />
    <NuxtImg
      v-if="src"
      width="400"
      height="600"
      format="webp"
      :src="`/tmdb${src}`"
      :alt="alt"
      class="rounded-t-lg"
    />
    <div v-else class="flex aspect-[4/6] rounded-t-lg bg-muted opacity-50">
      <Icon name="lucide:circle-help" class="m-auto" />
    </div>
    <slot name="action" />
  </div>
</template>
