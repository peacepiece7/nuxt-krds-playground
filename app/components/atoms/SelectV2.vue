<script setup lang="ts">
  import { computed, unref, type ComputedRef } from 'vue'
  import HanuiSelect, { type SelectOption } from '~/components/hanui/Select.vue'

  export type SelectV2Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'max'

  export type SelectV2Props = {
    modelValue: string | number | null
    items: Record<string, unknown>[]
    itemText?: string
    itemValue?: string
    size?: SelectV2Size
    label?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    multiple?: boolean
    error?: ComputedRef<boolean> | boolean
    errorMessageId?: ComputedRef<string> | string
  }

  const props = withDefaults(defineProps<SelectV2Props>(), {
    itemText: 'title',
    itemValue: 'value',
    size: 'md',
    label: undefined,
    disabled: false,
    readonly: false,
    clearable: false,
    multiple: false,
    placeholder: '선택',
    error: undefined,
    errorMessageId: undefined,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | null): void
  }>()

  const error = computed(() => unref(props.error))

  const value = computed({
    get: () => (props.modelValue == null ? '' : String(props.modelValue)),
    set: (v: string) => emit('update:modelValue', v || null),
  })

  const options = computed<SelectOption[]>(() =>
    props.items.map((item) => ({
      value: String(item?.[props.itemValue] ?? ''),
      label: String(item?.[props.itemText] ?? ''),
      disabled: Boolean((item as Record<string, unknown>)?.disabled),
    }))
  )

  const sizeMap: Record<SelectV2Size, 'sm' | 'md' | 'lg'> = {
    xs: 'sm',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'lg',
    max: 'lg',
  }
</script>

<template>
  <HanuiSelect
    v-model="value"
    :options="options"
    :label="props.label"
    :placeholder="props.placeholder"
    :disabled="props.disabled || props.readonly"
    :status="error ? 'error' : undefined"
    :size="sizeMap[props.size]"
    v-bind="$attrs"
  />
</template>
