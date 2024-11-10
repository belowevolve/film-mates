<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
  validate: async (route,
  ) => {
    // Check if the id is made up of digits
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  },
})

const supabase = useSupabaseClient()
const route = useRoute()
const listId = Number.parseInt(route.params.id as string, 10)

const { data: list } = await useAsyncData('list', async () => {
  const { data } = await supabase
    .from('movieslists')
    .select('*')
    .eq('id', listId)
    .limit(1)
    .single()

  return data
})

const { data: movies, refresh: refreshMovies } = await useAsyncData('movies', async () => {
  const { data } = await supabase
    .from('movieslists_items')
    .select(`*, movies(*), profiles(*)`)
    .eq('list_id', listId)

  return data
})

async function deleteMovie(movieId: number) {
  await supabase.from('movieslists_items').delete().eq('list_id', listId).eq('id', movieId)
  refreshMovies()
}
</script>

<template>
  <div class="flex justify-between">
    <h1> {{ list?.name }}</h1>
    <CreateInviteLink :list-id="listId" />
  </div>
  <MediaGrid>
    <Card v-for="movie in movies" :key="movie.id">
      <MediaImage :src="movie.movies?.poster_path" :alt="movie.movies?.title">
        <template #additional>
          <div class="absolute -left-3 -top-3 flex items-center -space-x-2 ">
            <NuxtImg :src="movie.profiles?.avatar_url || ''" :alt="movie.profiles?.full_name || ''" class="z-50 size-8 rounded-full border-2 shadow-md" />
            <i class="rounded-r-full border bg-card pl-3 pr-2 shadow-md">
              {{ movie.profiles?.full_name }}
            </i>
          </div>
        </template>
      </MediaImage>

      <CardContent class="mt-2 flex">
        <b>{{ movie.movies?.title }}</b>
        <div class="ml-auto">
          <Button size="xs" @click="deleteMovie(movie.id)">
            <Icon name="lucide:trash" size="16" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </MediaGrid>
</template>
