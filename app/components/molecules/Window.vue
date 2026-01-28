<script setup lang="ts">
  import { computed } from 'vue'
  export type WindowStep = {
    step: number
    title: string
    subtitle?: string
  }

  type Props = {
    modelValue: number
    steps: WindowStep[]
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
  }>()

  const active = computed({
    get: () => props.modelValue,
    set: (v: number) => emit('update:modelValue', v),
  })
</script>

<template>
  <div class="window" role="region" aria-label="신청 단계 콘텐츠">
    <div v-for="(s, i) in props.steps" :key="s.step" :aria-hidden="i !== active">
      <div v-show="i === active" style="width: 100%">
        <slot :step="s" :index="i" />
      </div>
    </div>
  </div>
</template>
