<script setup lang="ts">
  import { computed } from 'vue'
  import HanuiModal from '~/components/hanui/Modal.vue'

  export interface DialogProps {
    modelValue: boolean
    maxWidth?: string | number
    scrollable?: boolean
    persistent?: boolean
    fullscreen?: boolean
  }

  const props = withDefaults(defineProps<DialogProps>(), {
    maxWidth: '800',
    scrollable: true,
    persistent: false,
    fullscreen: false,
  })

  const emit = defineEmits<{
    'update:modelValue': [boolean]
  }>()

  const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  })

  const closeDialog = () => (isOpen.value = false)

  const modalSize = computed<'sm' | 'md' | 'lg' | 'xl' | 'full'>(() => {
    if (props.fullscreen) return 'full'
    const width = Number(props.maxWidth)
    if (!Number.isNaN(width)) {
      if (width >= 1200) return 'xl'
      if (width >= 900) return 'lg'
      if (width >= 600) return 'md'
      return 'sm'
    }
    return 'lg'
  })
</script>

<template>
  <HanuiModal :open="isOpen" :size="modalSize" @update:open="isOpen = $event">
    <div class="dialog">
      <div
        v-if="$slots.title || $slots['close-icon']"
        class="border-grey-300 flex items-center justify-between border-b pb-4"
      >
        <div class="dialog__title-content flex flex-1 items-center gap-2">
          <slot name="title" />
        </div>

        <div>
          <slot name="close-icon" :close="closeDialog">
            <Button color="inverse" size="xs" @click="closeDialog">
              <IcIcon icon="close" />
            </Button>
          </slot>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <slot name="content" />
      </div>

      <div
        v-if="$slots.footer"
        class="dialog__footer border-grey-200 border-t pt-4"
      >
        <slot name="footer" :close="closeDialog" />
      </div>
    </div>
  </HanuiModal>
</template>

<style scoped>
  .dialog {
    .dialog__title-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .dialog__info-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .dialog__info-icon {
      font-size: 1.5rem;
      color: var(--color-grey-600);
    }

    .dialog__info-text {
      color: var(--color-grey-900);
      font-size: 1rem;
      padding: 0.25rem;
    }

    .dialog__section {
      display: flex;
      flex-direction: column;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 0;
      padding-right: 0;
    }

    .dialog__section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-grey-900);
      margin: 0;
    }

    .dialog__text {
      color: var(--color-grey-600);
      font-size: 1rem;
      line-height: 1.8;
      margin: 0;
    }
  }

  .dialog-item {
    cursor: pointer;
  }
</style>
