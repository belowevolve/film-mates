<template>
  <NuxtLoadingIndicator />
  <NuxtLayout />
  <main class="container flex max-w-4xl flex-col gap-6 pt-4">
    <NuxtPage />
    <Toaster rich-colors theme="dark" position="top-right" />
  </main>
</template>
