<script setup lang="ts">
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/cn'

definePageMeta({
  layout: 'navbar',
})

const { data: movieLists } = useMovieLists()
</script>

<template>
  <h1>My lists</h1>
  <MediaGrid>
    <NuxtLink v-for="list in movieLists" :key="list.movieslists?.id" :href="`/list/${list.movieslists?.id}`" :class="cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'justify-between')">
      {{ list.movieslists?.name }}
      <Icon name="lucide:more-vertical" />
    </NuxtLink>
  </MediaGrid>
  <h2>Create a new list</h2>
  <CreateMovieList />

  <h1>Search</h1>
  <Search />
</template>
