<script setup lang="ts">
import { buttonVariants } from '~/components/ui/button'
</script>

<template>
  <nav class="ml-auto py-4">
    <NuxtLink to="/login" :class="buttonVariants({ variant: 'default' })">
      Login
    </NuxtLink>
  </nav>
  <h1 class="text-balance text-center text-5xl font-bold">
    Welcome to Film-Mates
  </h1>
</template>
