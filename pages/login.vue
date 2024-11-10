<script setup lang="ts">
const supabase = useSupabaseClient()

const url = useRequestURL()
function signInWithOAuth(provider: 'discord' | 'google') {
  supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${url.origin}/confirm`,
    },
  })
}
</script>

<template>
  <div class="grid h-dvh grid-rows-3 gap-4">
    <h1 class="mt-auto text-balance text-center text-5xl font-bold">
      Welcome to Film-Mates
    </h1>
    <nav class="flex flex-col items-center gap-4 ">
      <Button @click="signInWithOAuth('discord')">
        Sign in with Discord
      </Button>
      <Button @click="signInWithOAuth('google')">
        Sign in with Google
      </Button>
    </nav>
    <p class="mt-auto text-center text-sm text-gray-500">
      Made with &lt;3 by
      <a href="https://github.com/belowevolve" target="_blank">
        belowevolve
      </a>
    </p>
  </div>
</template>
