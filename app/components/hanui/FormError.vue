<script setup lang="ts">
  import { inject, computed } from 'vue'
  import { CircleX } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    class?: string
  }>()

  const formField = inject<any | null>(null)

  const classes = computed(() =>
    cn(
      'flex items-center gap-1 text-[15px] text-krds-danger-60 leading-[150%]',
      props.class,
    ),
  )
</script>

<template>
  <div
    :id="formField?.errorId"
    :class="classes"
    role="alert"
    aria-live="polite"
  >
    <span class="text-krds-danger-60 shrink-0" aria-hidden="true">
      <CircleX class="h-4 w-4" />
    </span>
    <span><slot /></span>
  </div>
</template>
