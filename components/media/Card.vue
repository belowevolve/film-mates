<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import { toast } from 'vue-sonner'
import type { Media, MediaType } from '~/tmdb'

defineProps<{
  type: MediaType
  item: Media
}>()

const loadingStates = ref(new Map<number, boolean>())
const { data: movieLists } = useMovieLists()
const supabase = useSupabaseClient()

async function addMovie(item: Media, list: { id: number, name: string } | null) {
  if (!list || loadingStates.value.get(list.id))
    return

  try {
    loadingStates.value.set(list.id, true)

    const { error } = await supabase.rpc('add_movie_to_list', {
      p_tmdb_id: item.id,
      p_title: item.title,
      p_poster_path: item.poster_path,
      p_release_date: item.release_date ?? '',
      p_list_id: list.id,
    })
    if (error)
      throw error
    toast.success(`${item.title} added to ${list.name}`)
  }
  catch (error) {
    console.error('Failed to add movie to list:', error)
    toast.error(`Failed to add ${item.title} to ${list.name}`)
  }
  finally {
    loadingStates.value.set(list.id, false)
  }
}
</script>

<template>
  <Card>
    <MediaImage :src="item.poster_path" :alt="item.title || item.name">
      <template #action>
        <Popover>
          <PopoverTrigger as-child>
            <Button class="absolute bottom-2 right-2 rounded-full" size="icon">
              <Icon name="lucide:plus" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="flex flex-col gap-2">
            Add movie to list
            <Button
              v-for="list in movieLists"
              :key="list.movieslists?.id"
              :disabled="!list.movieslists || loadingStates.get(list.movieslists?.id)"
              @click="addMovie(item, list.movieslists)"
            >
              <template v-if="!list.movieslists || loadingStates.get(list.movieslists?.id)">
                <Icon name="lucide:loader" class="animate-spin" />
              </template>
              <template v-else>
                {{ list.movieslists?.name }}
              </template>
            </Button>
          </PopoverContent>
        </Popover>
      </template>
    </MediaImage>
    <CardContent class="mt-1">
      <b>
        {{ item.title || item.name }}
      </b>
      <CardDescription>
        {{ item.vote_average }}
      </CardDescription>
    </CardContent>
  </Card>
</template>
