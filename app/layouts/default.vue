<script setup lang="ts">
  import '~/assets/icon-font/icon-font.css'

  const route = useRoute()

  const pageMeta = computed(() => {
    return {
      title: route.meta.title,
      description: route.meta.description,
      // link: [
      //   {
      //     rel: 'stylesheet',
      //     href: 'https://cdn.ckeditor.com/ckeditor5/45.1.0/ckeditor5-content.css',
      //   },
      // ],
    }
  })

  useHead(pageMeta)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <GNB />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style></style>
