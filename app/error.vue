<script setup lang="ts">
  const props = defineProps<{
    error: {
      statusCode?: number
      statusMessage?: string
      message?: string
    }
  }>()

  const message = computed(() => String(props.error?.message || ''))
  const is404 = computed(
    () => props.error?.statusCode === 404 || message.value?.includes('404'),
  )

  function handleError() {
    return clearError({ redirect: '/' })
  }
</script>

<template>
  <NuxtLayout>
    <Container class="flex min-h-[60vh] items-center justify-center">
      <div class="w-full text-center">
        <h1 class="text-h3 mb-4">
          {{
            is404
              ? 'The page you are looking for does not exist.'
              : 'An error occurred'
          }}
        </h1>
        <p class="text-body-1 mb-4">
          The page you are looking for does not exist.
        </p>
        <Button @click="handleError">Go to home</Button>
      </div>
    </Container>
  </NuxtLayout>
</template>
