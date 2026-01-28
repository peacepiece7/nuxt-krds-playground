<script setup lang="ts">
  import { computed } from 'vue'
  export type SubheaderInfo = {
    title: string
    content: string[]
  }

  export type SlideGroupItem = {
    id: string
    title?: string
    icon?: string
    subheaders?: SubheaderInfo[]
    noticeTitle?: string
    noticeContent?: string[]
    [key: string]: any
  }

  type Props = {
    items: SlideGroupItem[]
    modelValue: string
    btnSize?: 'base' | 'small' | 'large'
    showArrows?: boolean
    maxVisibleItems?: number
    estimatedItemWidthPx?: number
    estimatedItemGapPx?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    modelValue: '',
    btnSize: 'base',
    showArrows: true,
    maxVisibleItems: undefined,
    estimatedItemWidthPx: undefined,
    estimatedItemGapPx: 8,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const selectedTab = computed({
    get: () => props.modelValue || props.items[0]?.id || '',
    set: (value) => emit('update:modelValue', value),
  })
</script>

<template>
  <div class="w-full">
    <div class="flex w-full gap-2 overflow-x-auto">
      <template v-for="item in props.items" :key="item.id">
        <slot name="item" :item="item" :is-selected="selectedTab === item.id" :toggle="() => (selectedTab = item.id)">
          <button
            class="slide-group__tab"
            :class="{
              'slide-group__tab--active': selectedTab === item.id,
              [`slide-group__tab--${props.btnSize}`]: true,
            }"
            type="button"
            @click="selectedTab = item.id"
          >
            {{ item.title ?? '' }}
          </button>
        </slot>
      </template>
    </div>
  </div>
</template>
