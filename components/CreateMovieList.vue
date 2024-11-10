<script setup lang="ts">
import { toast } from 'vue-sonner'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { refresh } = useMovieLists()

const newListName = ref('')
const loading = ref(false)
async function createList() {
  if (loading.value)
    return
  try {
    loading.value = true
    if (!user.value)
      throw new Error('User not found')
    const { data, error } = await supabase.from('movieslists').insert([
      {
        name: newListName.value,
        created_by: user.value?.id,
      },
    ]).select('name').limit(1).single()
    if (error) {
      throw error
    }
    if (!data)
      throw new Error('No data returned')

    toast.success(`List created: ${data.name}`)
    newListName.value = ''
    refresh()
  }
  catch (error) {
    console.error('Failed to create list:', error)
    toast.error('Failed to create list')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="createList">
    <fieldset class="flex gap-4" :disabled="loading">
      <Input v-model="newListName" type="text" placeholder="New list name" required />
      <Button type="submit">
        Create
      </Button>
    </fieldset>
  </form>
</template>
