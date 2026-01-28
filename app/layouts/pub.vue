<script setup lang="ts">
  import { onUnmounted } from 'vue'
  import { usePubGuideStore } from '~/stores/pubGuildStore'

  const pubGuideStore = usePubGuideStore()

  onUnmounted(() => {
    console.log('PUB LAYOUT unmounted')
    pubGuideStore.initialize()
  })
</script>

<template>
  <div>
    <h2 id="pub-layout">Pub Layout</h2>
    <slot />
  </div>
</template>
