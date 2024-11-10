<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()

if (typeof route.params.invite === 'string') {
  const { data, error } = await supabase.rpc('add_user_to_list', {
    invite_id: route.params.invite,
  })
  if (error) {
    console.error(error)
  }
  else {
    if (data) {
      console.log(data)
    }
    navigateTo('/dashboard')
  }
}
</script>

<template>
  <div>Waiting for invite...</div>
</template>
