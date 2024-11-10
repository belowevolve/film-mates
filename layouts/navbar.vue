<script setup lang="ts">
import type { Database } from '~/types/database.types'

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
    return
  }
  await navigateTo('/')
}
</script>

<template>
  <header class="mx-auto w-full max-w-screen-xl p-4">
    <nav class="flex items-center">
      <NuxtLink href="/dashboard">
        <Icon name="lucide:house" />
      </NuxtLink>
      <Popover>
        <PopoverTrigger as-child>
          <NuxtImg class="ml-auto size-10 cursor-pointer rounded-full" :src="user?.user_metadata.avatar_url" />
        </PopoverTrigger>
        <PopoverContent>
          <Button @click="signOut">
            Sign out
          </Button>
        </PopoverContent>
      </Popover>
    </nav>
  </header>
</template>

<!-- <header class="fixed bottom-4 left-1/2 w-full max-w-screen-sm -translate-x-1/2 bg-gradient-to-b to-background">

  <div class="mx-4 flex justify-around rounded-3xl bg-card p-4 text-popover-foreground">
  <div class="flex flex-col items-center">
    <Icon name="lucide:list-check" />
    <p>Lists</p>
  </div>
  <div class="flex flex-col items-center">
    <Icon name="lucide:list-check" />
    <p>Lists</p>
  </div>
  <div class="flex flex-col items-center">
    <Icon name="lucide:list-check" />
    <p>Lists</p>
  </div>
</div>
  </header> -->
