<script setup lang="ts">
import { toast } from 'vue-sonner'

const props = defineProps<{
  listId: number
}>()

const url = useRequestURL()
const supabase = useSupabaseClient()
const { copy } = useClipboard()

const isLoading = ref(false)
async function createInvite() {
  if (isLoading.value)
    return

  try {
    isLoading.value = true

    const { data, error } = await supabase
      .from('invites')
      .upsert(
        { list_id: props.listId },
        {
          onConflict: 'list_id',
          count: 'exact',
        },
      )
      .select('id')
      .limit(1)
      .single()

    if (error)
      throw error
    if (!data)
      throw new Error('No data returned')

    const inviteLink = `${url.origin}/invite/${data.id}`
    await copy(inviteLink)
    toast.success('Invite link copied to clipboard')
  }
  catch (error) {
    console.error('Failed to create invite:', error)
    toast.error('Failed to create invite link')
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Button
    :disabled="isLoading"
    class="relative"
    @click="createInvite"
  >
    <Icon
      :name="isLoading ? 'lucide:loader-2' : 'lucide:user-plus'"
      :class="{ 'animate-spin': isLoading }"
    />
    Create invite
  </Button>
</template>
