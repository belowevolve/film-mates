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
  <h2 class="text-balance pt-48 text-center text-5xl font-bold">
    Welcome to Film-Mates
  </h2>
  <Button @click="signInWithOAuth('discord')">
    Sign in with Discord
  </Button>
  <Button @click="signInWithOAuth('google')">
    Sign in with Google
  </Button>
  <footer class="fixed inset-x-0 bottom-0 text-center text-sm text-gray-500">
    Made with &lt;3 by
    <a href="https://github.com/belowevolve" target="_blank">
      belowevolve
    </a>
  </footer>
</template>
