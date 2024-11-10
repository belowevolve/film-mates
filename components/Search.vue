<script setup lang="ts">
import type { Media, PageResult } from '~/tmdb'

const route = useRoute()
const router = useRouter()

const input = ref((route.query.s || '').toString())

const error = ref<unknown>()
const count = ref<undefined | number>()

const items = ref<Media[]>([])
const currentSearch = ref(input.value)

function search() {
  if (currentSearch.value === input.value)
    return

  currentSearch.value = input.value.toString()
  count.value = undefined
  items.value = []
  router.replace({ query: { s: input.value } })
}

async function fetch(page: number) {
  if (!currentSearch.value)
    return
  try {
    const data = await $fetch<PageResult<Media>>('/api/tmdb/search/movie', {
      params: {
        query: currentSearch.value,
        page,
      },
    })
    count.value = data.total_results ?? count.value
    items.value.push(...data.results)
  }
  catch (e: any) {
    error.value = e
  }
}

const throttledSearch = useDebounceFn(search, 500)

const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
}

useHead({
  title: computed(() => `Search: ${currentSearch.value}`),
})

watch(
  () => input.value,
  () => throttledSearch(),
)
</script>

<template>
  <div class="sticky top-4 z-50 ">
    <div class="relative">
      <Icon name="lucide:search" class="absolute inset-y-0 m-2.5 size-5" />
      <Input
        v-model="input"
        v-focus
        class="pl-10"
        type="text"
        placeholder="Type to search..."
        @keyup.enter="search"
      />
    </div>
  </div>
  <div v-if="error">
    <h1 class="text-destructive">
      Error occurred on fetching
    </h1>
    <pre class="py-2">{{ error }} <Button @click="error = undefined">Retry</Button></pre>
  </div>

  <MediaAutoLoadGrid
    v-else-if="currentSearch"
    :key="currentSearch"
    :fetch="fetch"
    :items="items"
    :count="count"
    type="movie"
  />

  <div v-else class="p-10 text-center text-4xl opacity-50">
    Type something to search...
  </div>
</template>
