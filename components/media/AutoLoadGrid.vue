<script setup lang="ts">
import type { Media, MediaType } from '~/tmdb'

const props = withDefaults(
  defineProps<{
    items: Media[]
    type: MediaType
    fetch: (page: number) => Promise<void>
    count?: number
  }>(),
  {},
)

const tailEl = ref<HTMLDivElement>()

let page = 0
const isLoading = ref(false)

async function loadingNext() {
  if (isLoading.value)
    return
  isLoading.value = true
  try {
    page += 1
    await props.fetch(page)
  }
  finally {
    isLoading.value = false
  }
}

if (import.meta.client) {
  useIntervalFn(() => {
    if (!tailEl.value || isLoading.value)
      return
    if (props.count != null && props.items?.length >= props.count)
      return
    const { top } = tailEl.value.getBoundingClientRect()
    const delta = top - window.innerHeight
    if (delta < 400)
      loadingNext()
  }, 500)
}
</script>

<template>
  <p v-if="count != null" class="px-8 text-muted-foreground">
    {{ count }} items
  </p>
  <MediaGrid>
    <MediaCard
      v-for="item of items"
      :key="item.id"
      :type="type"
      :item="item"
    />
  </MediaGrid>
  <div ref="tailEl" />
  <div v-if="isLoading" class="animate-pulse p-10">
    <Icon name="i-carbon:circle-dash" class="m-auto animate-spin text-4xl" />
  </div>
</template>
