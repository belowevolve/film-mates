<script setup lang="ts">
import type { Media, PageResult } from '~/tmdb'

const { data } = await useFetch<PageResult<Media>>('/api/tmdb/movie/top_rated', {
  params: {
    page: 1,
  },
})
</script>

<template>
  <div v-if="data" class="space-y-4">
    <div v-for="(media, index) in data.results" :key="index" class="flex justify-between">
      <div class="flex items-center">
        <NuxtImg
          placeholder
          :src="`/tmdb${media.poster_path}`"
          class="size-32"
        />
        <div class="ml-4">
          <h3 class="text-xl font-bold">
            {{ media.title }}
          </h3>
          <p class="text-sm">
            {{ media.release_date }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
